const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { getWebviewContent } = require('./webview/docsWebviewContent');


function activate(context) {
	const launchjsonautocomplete = vscode.languages.registerCompletionItemProvider('jsonc', {
		provideCompletionItems() {
			const vscodelaunchjsoncompletionItem = new vscode.CompletionItem('VS Code Extension Development(Launch Extension)', vscode.CompletionItemKind.Module);
			vscodelaunchjsoncompletionItem.insertText = new vscode.SnippetString(`{
	"name": "Launch Extension",
	"type": "extensionHost",
	"request": "launch",
	"args": [
		"--extensionDevelopmentPath=\\\${workspaceFolder\\}"
	]
}`);
			vscodelaunchjsoncompletionItem.documentation = new vscode.MarkdownString("VS Code Extension Development");
			vscodelaunchjsoncompletionItem.detail = 'VS Code Extension Development';
			const vscodelaunchjsoncustomcompletionItem = new vscode.CompletionItem('VS Code Extension Development(Custom Launch Extension)', vscode.CompletionItemKind.Module);
			vscodelaunchjsoncustomcompletionItem.insertText = new vscode.SnippetString(`{
	"name": "\${1:Launch Extension}",
	"type": "extensionHost",
	"request": "launch",
	"args": [
		"--extensionDevelopmentPath=\\\${workspaceFolder\\}"
	]
}$0`);
			vscodelaunchjsoncustomcompletionItem.documentation = new vscode.MarkdownString("VS Code Extension Development(Custom)");
			vscodelaunchjsoncustomcompletionItem.detail = 'VS Code Extension Development(Custom)';
			return [
				vscodelaunchjsoncompletionItem,
				vscodelaunchjsoncustomcompletionItem
			];
		}
	});

	const docsWebview = vscode.commands.registerCommand('vscode-extension-development-intellisense.showDocumentation', () => {
		const panel = vscode.window.createWebviewPanel(
			'vscodeExtensionDevelopmentIntellisenseDocumentation',
			'VSCODE Extension Development Intellisense Documentation',
			vscode.ViewColumn.Beside,
			{}
		);

		const markdownPath = path.join(context.extensionPath, 'vscode-extension-development-intellisense-docs.md');
		fs.readFile(markdownPath, 'utf8', (err, data) => {
			if (err) {
				vscode.window.showErrorMessage('Could not load markdown file');
				return;
			}
			panel.webview.html = getWebviewContent(data);
		});
	});

	context.subscriptions.push(launchjsonautocomplete, docsWebview);
}

exports.activate = activate;