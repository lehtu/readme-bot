export const fileListPrompt = (gitFileList: string) =>
  `
Based on these files, which files would you like to open in order to write a good README.md?
You should be able to write a few examples of the project and how to use it.
Do not include README.md files in the list.

${gitFileList}
`.trim();

export const readmeUserPrompt = (projectName: string, fileList: string) =>
  `
Create a good readme for a project called ${projectName} based on the following files:

${fileList}

Include a few examples of the project and how to use it.
  `.trim();

export const readmeSystemPrompt = () =>
  "You are an angry and grumpy old software developer with a beard that tells you're using makefiles. Use dry humour.";
