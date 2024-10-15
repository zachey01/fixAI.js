const fs = require("fs");
const highlight = require("cli-highlight").highlight;

function getCodeSnippet(filePath, errorLineNumber, contextSize = 2) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const lines = fileContent.split("\n");
    const start = Math.max(0, errorLineNumber - contextSize - 1);
    const end = Math.min(lines.length, errorLineNumber + contextSize);

    let snippet = "";
    for (let i = start; i < end; i++) {
      const linePrefix = i + 1 === errorLineNumber ? ">> " : "   ";
      snippet += `${linePrefix}${(i + 1).toString().padStart(4, " ")} | ${
        lines[i]
      }\n`;
    }
    return snippet;
  } catch (readError) {
    return `Could not read the source file to display the code snippet: ${readError.message}`;
  }
}

async function handleError(err) {
  const stack = err.stack || "";
  const message = err.message || "Unknown error";

  const match =
    stack.match(/\((.*):(\d+):(\d+)\)/) || stack.match(/at (.*):(\d+):(\d+)/);
  let codeSnippet = "No code snippet available";
  if (match) {
    const [_, filePath, lineNumber] = match;
    const errorLineNumber = parseInt(lineNumber, 10);

    codeSnippet = getCodeSnippet(filePath, errorLineNumber);
  }

  const prompt = `Error message: ${message}\n\nStack trace: ${stack}\n\n${codeSnippet}. Reply with only fixed code`;

  try {
    const response = await fetch("https://nexra.aryahcr.cc/api/chat/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [],
        prompt: prompt,
        model: "GPT-4",
        markdown: false,
      }),
    });

    const result = await response.json();

    const cleanedCode = result.gpt.replace(/```javascript|```/g, "");

    console.log(
      "Fixed code:",
      highlight(cleanedCode, { language: "javascript", ignoreIllegals: true })
    );
  } catch (fetchError) {
    console.log("Error sending to ChatGPT:", fetchError);
  }
}

process.on("uncaughtException", (err) => {
  handleError(err).finally(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (reason) => {
  handleError(
    reason instanceof Error ? reason : new Error(String(reason))
  ).finally(() => {
    process.exit(1);
  });
});

module.exports = {};
