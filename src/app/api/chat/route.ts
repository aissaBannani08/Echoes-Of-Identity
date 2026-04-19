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

    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return NextResponse.json({ error: 'OpenAI API Key is missing' }, { status: 500 });
    }

    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: apiMessages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch response from OpenAI' }, { status: response.status });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message;

    return NextResponse.json(assistantMessage);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
