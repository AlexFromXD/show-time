function getDateString (d: Date): string {
  const dtf = new Intl.DateTimeFormat('en-ZA', {
    weekday: 'long', hour12: false,
    year: 'numeric', month: 'numeric', day: '2-digit',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  })
  return dtf.format(d)
}

export function parseFocusLine (line: string): string|void {
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
    const now = Date.now()
    return `${getDateString(new Date(now))} | ${now/1000}`
  }
  const timestamp = Date.parse(line)
  if (timestamp) {
    return `timestamp in second: ${String(timestamp/1000)}`
  }
}