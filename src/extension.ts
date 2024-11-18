import * as vscode from "vscode";

export const getNxProjectName = (filePath: string): string | null => {
  const bashCompatibleFilePath = filePath.replace(/\\/g, "/");
  const pathParts = bashCompatibleFilePath.split("/");
  const appsIndex = pathParts.indexOf("apps");
  const libsIndex = pathParts.indexOf("libs");

  if (appsIndex !== -1) {
    return pathParts[appsIndex + 1];
  } else if (libsIndex !== -1) {
    return pathParts[libsIndex + 1];
  }

  return null;
};

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "nx-test-file" is now active!');

  const nxTestFileDisposable = vscode.commands.registerCommand(
    "nx-test-file.runTestFile",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const filePath = editor.document.fileName;
        const bashCompatibleFilePath = filePath.replace(/\\/g, "/");
        if (bashCompatibleFilePath.endsWith(".test.ts")) {
          const nxProjectName = getNxProjectName(bashCompatibleFilePath);
          let terminal = vscode.window.terminals.find(
            (t) => t.name === "Run Test"
          );

          if (!terminal) {
            terminal = vscode.window.createTerminal(`Run Test`);
          }
          terminal.show();
          terminal.sendText(
            `npx nx run ${nxProjectName}:test --test-file=${bashCompatibleFilePath}`
          );
        } else {
          vscode.window.showErrorMessage(
            "This command can only be run on .test.ts files."
          );
        }
      }
    }
  );

  context.subscriptions.push(nxTestFileDisposable);
}

export function deactivate() {}
