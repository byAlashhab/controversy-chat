import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY || "",
// });

export const runtime = "edge";

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();
  console.log(messages);

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: 'You are a helpful assistant.',
    messages: [],
  });

  return result.toDataStreamResponse();

  // const response = await openai.chat.completions.create({
  //   model: "chatgpt-4o-latest",
  //   messages: [
  //     {
  //       role: "system",
  //       content: "",
  //     },
  //     ...messages,
  //   ],
  //   stream: true,
  //   temperature: 1,
  // });

  // const stream = OpenAIStream(response)

  // return new StreamingTextResponse(stream)
}
