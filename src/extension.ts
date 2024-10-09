import * as vscode from "vscode";

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
          let terminal = vscode.window.terminals.find(
            (t) => t.name === "Run Test"
          );

          if (!terminal) {
            terminal = vscode.window.createTerminal(`Run Test`);
          }
          terminal.show();
          terminal.sendText(
            `npx nx run core:test --test-file=${
              isBashShell() ? bashCompatibleFilePath : filePath
            }`
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

function isBashShell() {
  const shellPath = vscode.workspace
    .getConfiguration("terminal")
    .get<string>("integrated.shell.windows");

  return shellPath && (shellPath.includes("bash") || shellPath.includes("sh"));
}

export function deactivate() {}
