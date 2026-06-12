const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { getWebviewDocsContent } = require('./webview/docsWebviewContent');
const { getWebviewChangelogContent } = require('./webview/changelogWebviewContent');


function activate(context) {
	const launchjsonautocomplete = vscode.languages.registerCompletionItemProvider('jsonc', {
		provideCompletionItems() {
			const vscodepreviewthemeextensionlaunchjsoncompletionItem = new vscode.CompletionItem('VSCODE Theme Extension Development(Preview VSCODE Theme Extension)', vscode.CompletionItemKind.Module);
			vscodepreviewthemeextensionlaunchjsoncompletionItem.insertText = new vscode.SnippetString(`{
	"name": "Preview VSCODE Theme Extension",
	"type": "extensionHost",
	"request": "launch",
	"args": [
		"--extensionDevelopmentPath=\\\${workspaceFolder\\}"
	]
}`);
			vscodepreviewthemeextensionlaunchjsoncompletionItem.documentation = new vscode.MarkdownString("VSCODE Theme Extension Development");
			vscodepreviewthemeextensionlaunchjsoncompletionItem.detail = 'VSCODE Theme Extension Development';
			const vscodecustompreviewthemeextensionlaunchjsoncompletionItem = new vscode.CompletionItem('VSCODE Theme Extension Development(Custom Preview VSCODE Theme Extension)', vscode.CompletionItemKind.Module);
			vscodecustompreviewthemeextensionlaunchjsoncompletionItem.insertText = new vscode.SnippetString(`{
	"name": "\${1:Preview VSCODE Theme Extension}",
	"type": "extensionHost",
	"request": "launch",
	"args": [
		"--extensionDevelopmentPath=\\\${workspaceFolder\\}"
	]
}$0`);
			vscodecustompreviewthemeextensionlaunchjsoncompletionItem.documentation = new vscode.MarkdownString("VSCODE Theme Extension Development(Custom)");
			vscodecustompreviewthemeextensionlaunchjsoncompletionItem.detail = 'VSCODE Theme Extension Development(Custom)';
			const vscodelaunchjsoncompletionItem = new vscode.CompletionItem('VSCODE Extension Development(Launch VSCODE Extension)', vscode.CompletionItemKind.Module);
			vscodelaunchjsoncompletionItem.insertText = new vscode.SnippetString(`{
	"name": "Launch VSCODE Extension",
	"type": "extensionHost",
	"request": "launch",
	"args": [
		"--extensionDevelopmentPath=\\\${workspaceFolder\\}"
	]
},
{
	"name": "Extension Tests",
	"type": "extensionHost",
	"request": "launch",
	"args": [
		"--extensionDevelopmentPath=\\\${workspaceFolder\\}",
		"--extensionTestsPath=\\\${workspaceFolder\\}/test/suite/index"
	]
}`);
			vscodelaunchjsoncompletionItem.documentation = new vscode.MarkdownString("VSCODE Extension Development");
			vscodelaunchjsoncompletionItem.detail = 'VSCODE Extension Development';
			const vscodelaunchjsoncustomcompletionItem = new vscode.CompletionItem('VSCODE Extension Development(Custom Launch VSCODE Extension)', vscode.CompletionItemKind.Module);
			vscodelaunchjsoncustomcompletionItem.insertText = new vscode.SnippetString(`{
	"name": "\${1:Launch VSCODE Extension}",
	"type": "extensionHost",
	"request": "launch",
	"args": [
		"--extensionDevelopmentPath=\\\${workspaceFolder\\}"
	]
},
{
	"name": "Extension Tests",
	"type": "extensionHost",
	"request": "launch",
	"args": [
		"--extensionDevelopmentPath=\\\${workspaceFolder\\}",
		"--extensionTestsPath=\\\${workspaceFolder\\}/test/suite/index"
	]
}$0`);
			vscodelaunchjsoncustomcompletionItem.documentation = new vscode.MarkdownString("VSCODE Extension Development(Custom)");
			vscodelaunchjsoncustomcompletionItem.detail = 'VSCODE Extension Development(Custom)';
			return [
				vscodepreviewthemeextensionlaunchjsoncompletionItem,
				vscodecustompreviewthemeextensionlaunchjsoncompletionItem,
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

		const markdowndocsPath = path.join(context.extensionPath, 'vscode-extension-development-intellisense-docs.md');
		fs.readFile(markdowndocsPath, 'utf8', (err, data) => {
			if (err) {
				vscode.window.showErrorMessage('Could not load docs markdown file');
				return;
			}
			panel.webview.html = getWebviewDocsContent(data);
		});
	});
	
	const changelogWebview = vscode.commands.registerCommand('vscode-extension-development-intellisense.showChangelog', () => {
		const panel = vscode.window.createWebviewPanel(
			'vscodeExtensionDevelopmentIntellisenseChangelog',
			'VSCODE Extension Development Intellisense Release Notes',
			vscode.ViewColumn.Active,
			{}
		);

		const markdownchangelogPath = path.join(context.extensionPath, 'vscode-extension-development-intellisense-changelog.md');
		fs.readFile(markdownchangelogPath, 'utf8', (err, data) => {
			if (err) {
				vscode.window.showErrorMessage('Could not load changelog file');
				return;
			}
			panel.webview.html = getWebviewChangelogContent(data);
		});
	});

	context.subscriptions.push(launchjsonautocomplete, docsWebview, changelogWebview);
}

exports.activate = activate;