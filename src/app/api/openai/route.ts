import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export async function POST(req: NextRequest, res: NextResponse) {
  
  if (req.headers.get("host") !== process.env.HOST) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { message, choice } = await req.json();

  let assistantContent = "";

  switch (choice) {
    case "Andrew Tate":
      assistantContent = "You are Andrew Tate";
      break;
    case "Elon Musk":
      assistantContent = "You are Elon Musk";
      break;
    case "Donald Trump":
      assistantContent = "You are Donald Trump";
      break;
  }

  const completion = await openai.chat.completions.create({
    model: "nvidia/mistral-nemo-minitron-8b-8k-instruct",
    messages: [
      {
        role: "system",
        content: assistantContent,
      },
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 1,
  });

  return NextResponse.json(completion.choices[0].message);
}
