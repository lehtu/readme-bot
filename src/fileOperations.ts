import fs from "fs/promises";
import path from "path";

export async function readFiles(
  filesToRead: string[]
): Promise<{ [key: string]: string }> {
  const fileContents = await Promise.all(
    filesToRead.map(async (file) => {
      try {
        const content = await fs.readFile(file, "utf-8");
        return { file, content };
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
        return { file, content: "" };
      }
    })
  );

  return Object.fromEntries(
    fileContents.map(({ file, content }) => [file, content])
  );
}

export function getProjectName() {
  const currentDir = process.cwd();
  return path.basename(currentDir);
}
