import { createChatCompletion } from "./openai.js";

async function main() {
  const response = await createChatCompletion("Say this is a test");
  console.log(response);
}

main();
