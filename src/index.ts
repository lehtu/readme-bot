#!/usr/bin/env node

import { runCommand } from "./cli.js";
import { createReadme, getFileList } from "./openai.js";
import { readFiles, saveReadme } from "./fileOperations.js";
import { fileListPrompt } from "./prompts.js";

async function main() {
  const gitFileList = await runCommand("git ls-files");

  const response = await getFileList(fileListPrompt(gitFileList.stdout));
  const files = response.list_of_files.filter(
    (file) => !file.toLowerCase().includes("readme")
  );
  const fileContentMap = await readFiles(files);

  const readme = await createReadme(fileContentMap);
  await saveReadme(readme);

  console.log(
    `The following files was used to create the README.md:
${files.map((file) => `• ${file}`).join("\n")}`
  );
}

main();
