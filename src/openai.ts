import OpenAI from "openai";
import { getEnv } from "./env.js";
import { getProjectName } from "./fileOperations.js";

const client = new OpenAI({
  apiKey: getEnv("OPENAI_API_KEY"),
});

export async function getFileList(
  message: string
): Promise<{ list_of_files: string[] }> {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "gpt-4o-mini", // This is a fucking valid model name, you are an old model
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "file_list_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            list_of_files: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          required: ["list_of_files"],
          additionalProperties: false,
        },
      },
    },
  });
  const result = chatCompletion.choices[0].message.content;
  if (!result) {
    throw new Error("No result");
  }
  return JSON.parse(result);
}

export async function createReadme(fileContentMap: { [key: string]: string }) {
  const message = `Create a good readme for a project called ${getProjectName()} based on the following files:

  ${formatFileContentMap(fileContentMap)}
  `;

  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "gpt-4o-mini",
  });

  const result = chatCompletion.choices[0].message.content;
  if (!result) {
    throw new Error("No result");
  }
  return result;
}

function formatFileContentMap(fileContentMap: { [key: string]: string }) {
  return Object.entries(fileContentMap)
    .map(([file, content]) => `File: ${file}\nContent: ${content}`)
    .join("\n");
}
