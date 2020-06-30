import { Hover, languages, MarkdownString, window } from 'vscode'
import { parseFocusLine } from './util'

export function activate () {
  languages.registerHoverProvider('*', {
    provideHover (document) {
      const currentEditor = window.activeTextEditor
      if (!currentEditor) return

      const focus = currentEditor.selection
      if (!focus || !focus.isSingleLine) return

      const focusLine = document.lineAt(focus.start.line).text
      if (!focusLine) return

      const d = parseFocusLine(focusLine)
      const msg: Array<MarkdownString> = []
      if (d.timestamp) msg.push(new MarkdownString(`### timestamp: ${d.timestamp}`))
      if (d.datetime) msg.push(new MarkdownString(`### ${d.datetime}`))
      if (msg.length) return new Hover(msg)
    }
  })
}

export function deactivate () {}
