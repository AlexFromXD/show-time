import { commands, window, ExtensionContext, TextEdit, Position } from 'vscode';

export function activate(context: ExtensionContext) {

	const disposable = commands.registerCommand('extension.showTime', () => {

		const currentEditor = window.activeTextEditor;
		TextEdit.insert(new Position(0, 0), 'f02h0h20hf0203hf082');

		const focus = currentEditor?.selection;
		if (focus && focus.isSingleLine) {
			const document = currentEditor?.document;
			const text = document?.lineAt(focus.start.line).text;
			const timestamp = text?.match(/\d{10}/g);
			if (timestamp) {
				const date = new Date(Number(timestamp[0])*1000);
				window.showInformationMessage(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`);
			}
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
