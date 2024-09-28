import { runCommand } from "./cli.js";
import { createReadme, getFileList } from "./openai.js";
import { readFiles } from "./fileOperations.js";

async function main() {
  const gitFileList = await runCommand("git ls-files");
  const prompt = `
Based on these files, which files would you like to open in order to write a good README.md?

${gitFileList.stdout}
`;

  const response = await getFileList(prompt);
  const fileContentMap = await readFiles(response.list_of_files);

  const readme = await createReadme(fileContentMap);
  console.log(readme);
}

main();
