import { commands, window, ExtensionContext } from 'vscode'

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
    // const unixtime = focusLine.match(/\d{10,13}/g)
    // if (unixtime) {
    //   let date: Date|undefined = undefined
    //   if (unixtime[0].length === 10) {
    //     date = new Date(Number(unixtime[0]) * 1000)
    //   } else if (unixtime[0].length === 13) {
    //     date = new Date(Number(unixtime[0]))
    //   }

    //   if (date) {
    //     window.showInformationMessage(getDateString(date))
    //     return
    //   }
    // }

    // const now = focusLine.match(/now/g)
    // if (now) {
    //   window.showInformationMessage(`${getDateString(new Date())}`)
    //   return
    // }

    // const timestamp = Date.parse(focusLine)
    // if (timestamp) window.showInformationMessage(`timestamp in second: ${String(timestamp/1000)}`)
  })

  context.subscriptions.push(disposable)
}

export function deactivate () {}


function getDateString(d: Date): string {
  const dtf = new Intl.DateTimeFormat('en-ZA', {
    weekday: 'long', hour12: false,
    year: 'numeric', month: 'numeric', day: '2-digit',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  })
  return dtf.format(d)
}

function parseFocusLine(line: string): string|void {
  const lineIncludes10Number = line.match(/\d{10}/)
  if (lineIncludes10Number) {
    return getDateString(new Date(Number(lineIncludes10Number[0]) * 1000))
  }
  const lineIncludes13Number = line.match(/\d{13}/)
  if (lineIncludes13Number) {
    console.log(lineIncludes13Number)
    return getDateString(new Date(lineIncludes13Number[0]))
  }
  const lineIncludeNow = line.match(/now/) 
  if (lineIncludeNow) {
    const date = new Date()
    return `${getDateString(date)} | ${date.getTime()/1000}`
  }
  const timestamp = Date.parse(line)
  if (timestamp) {
    return `timestamp in second: ${String(timestamp/1000)}`
  }
}