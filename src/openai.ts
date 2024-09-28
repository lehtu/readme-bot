import OpenAI from "openai";
import { getEnv } from "./env.js";

const client = new OpenAI({
  apiKey: getEnv("OPENAI_API_KEY"),
});

export async function createChatCompletion(message: string) {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "gpt-4o-mini",
  });
  return chatCompletion.choices[0].message.content;
}
