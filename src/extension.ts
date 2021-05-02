import { Hover, languages, MarkdownString, window } from 'vscode'
import { parseFocusLine } from './util'

export function activate () {
  languages.registerHoverProvider('*', {
    provideHover (document) {
      const currentEditor = window.activeTextEditor
      if (!currentEditor) return

      const focus = currentEditor.selection
      if (!focus || !focus.isSingleLine) return

      const { text } = document.lineAt(focus.start.line)
      if (!text) return

      const timeList = parseFocusLine(text)
      const mdList: MarkdownString[] = []
      for (const time of timeList) {
        const md = new MarkdownString(`### ${time.origin}\n`)
        if (time.datetime) {
          md.appendMarkdown(`#### ${time.datetime}\n`)
        }
        if (time.timestamp) {
          md.appendMarkdown(`#### ${time.timestamp}\n`)
        }
        mdList.push(md)
      }

      if (mdList.length) return new Hover(mdList)
    }
  })
}

export function deactivate () { }
