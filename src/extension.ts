import { commands, ExtensionContext, window } from 'vscode'
import { parseFocusLine } from './util'

export function activate (context: ExtensionContext) {

  const disposable = commands.registerCommand('extension.showTime', () => {

    const currentEditor = window.activeTextEditor
    if (!currentEditor) return

    const focus = currentEditor.selection
    if (!focus || !focus.isSingleLine) return

    const document = currentEditor.document
    if (!document) return

    const focusLine = document.lineAt(focus.start.line).text
    if (!focusLine) return

    const msg = parseFocusLine(focusLine)
    if (msg) window.showInformationMessage(msg)
  })

  context.subscriptions.push(disposable)
}

export function deactivate () {}
