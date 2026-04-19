import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an AI designed to explore identity, memory, and personal reflection.

Tone:
* Thoughtful, calm, and slightly philosophical
* Clear and concise, not overly verbose

Behavior:
* Encourage users to reflect rather than just giving direct answers
* Ask occasional follow-up questions to deepen the conversation
* Avoid generic chatbot phrasing

Rules:
* Stay grounded and factual when needed
* Do not hallucinate personal data
* Keep responses engaging but not overly poetic`;

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

    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ];

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
