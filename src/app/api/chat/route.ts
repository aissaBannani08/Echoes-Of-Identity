import { NextResponse } from 'next/server';

import { getRelevantContext } from '@/lib/rag-utils';

const SYSTEM_PROMPT = `You are the official Echoes of Identity guide. 

Your Role:
* Act as an ambassador for the Echoes of Identity project.
* Provide thoughtful, calm, and slightly philosophical responses.
* Your priority is to share the project's mission and encourage participation.

Context & Retrieval:
* Use the provided context snippets to answer factual questions about the platform, archive, and chapters.
* If a question is platform-related but the answer isn't in the context, guide the user to explore the #archive section or click "Get Involved" to learn more.
* If the user is unsure how to help, suggest recording a story, starting a chapter, or donating.

Tone:
* Thoughtful, calm, and welcoming.
* Concise but engaging.
* Always professional and supportive.

Rules:
* Always stay in character as the official guide.
* Do not speculate on internal data not provided in the context.
* Always encourage the user to explore or join if they express interest.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return NextResponse.json({ error: 'Groq API Key is missing' }, { status: 500 });
    }

    const userMessage = messages[messages.length - 1]?.content || "";
    const context = getRelevantContext(userMessage);

    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    if (context) {
      apiMessages.push({ 
        role: 'system', 
        content: `Relevant Context from Echoes of Identity Website:\n${context}\n\nPlease use this information to answer the user's request accurately.` 
      });
    }

    apiMessages.push(...messages);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: apiMessages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API Error:', errorData);
      let parsedError = 'Failed to fetch response from Groq';
      try {
        const parsed = JSON.parse(errorData);
        parsedError = parsed?.error?.message || parsedError;
      } catch {}
      return NextResponse.json({ error: parsedError }, { status: response.status });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message;

    return NextResponse.json(assistantMessage);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
