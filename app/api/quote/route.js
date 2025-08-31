import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You generate short motivational quotes (1–2 sentences max).",
          },
          {
            role: "user",
            content: `Give me a motivational quote about ${topic || "life"}.`,
          },
        ],
        max_tokens: 60,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const txt = await response.text();
      return NextResponse.json(
        { error: `Groq API error (${response.status}): ${txt}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    const quote =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Keep going—your best is yet to come.";

    return NextResponse.json({ quote });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
