import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { getNxProjectName } from "../extension";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});

suite("getNxProjectName", () => {
  test("should return the project name for apps", () => {
    const result = getNxProjectName("/path/to/apps/my-app/src/lib/my-lib.ts");
    assert.strictEqual(result, "my-app");
  });

  test("should return the project name for libs", () => {
    const result = getNxProjectName("/path/to/libs/my-lib/src/lib/my-lib.ts");
    assert.strictEqual(result, "my-lib");
  });

  test("should return null for other paths", () => {
    const result = getNxProjectName("/path/to/random/path.ts");
    assert.strictEqual(result, null);
  });
});
