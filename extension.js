const vscode = require('vscode');

function activate(context) {
	const provider = vscode.languages.registerCompletionItemProvider('jsonc', {
		provideCompletionItems() {
			const vscodelaunchjsoncompletionItem = new vscode.CompletionItem('VS Code Extension Development(Launch Extension)', vscode.CompletionItemKind.Module);
			vscodelaunchjsoncompletionItem.insertText = new vscode.SnippetString(`	{
		"name": "Launch Extension",
		"type": "extensionHost",
		"request": "launch",
		"args": [
			"--extensionDevelopmentPath=\${workspaceFolder}"
		]
	}`);
			vscodelaunchjsoncompletionItem.documentation = new vscode.MarkdownString("VS Code Extension Development");
			vscodelaunchjsoncompletionItem.detail = 'VS Code Extension Development';
			const vscodelaunchjsoncustomcompletionItem = new vscode.CompletionItem('VS Code Extension Development(Custom Launch Extension)', vscode.CompletionItemKind.Module);
			vscodelaunchjsoncustomcompletionItem.insertText = new vscode.SnippetString(`	{
		"name": "\${1:Launch Extension}",
		"type": "extensionHost",
		"request": "launch",
		"args": [
			"--extensionDevelopmentPath=\${workspaceFolder}"
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

	context.subscriptions.push(provider);
}

exports.activate = activate;