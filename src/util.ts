function getDateString (d: Date): string {
  const dtf = new Intl.DateTimeFormat('en-ZA', {
    weekday: 'long', hour12: false,
    year: 'numeric', month: 'numeric', day: '2-digit',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  })
  return dtf.format(d)
}

type ParseResult = {
  datetime?: string;
  timestamp?: number;
}

export function parseFocusLine (line: string): ParseResult {
  const lineIncludes10Number = line.match(/\d{10}/)
  if (lineIncludes10Number) {
    return {
      datetime: getDateString (new Date(Number(lineIncludes10Number[0]) * 1000))
    }
  }
  const lineIncludes13Number = line.match(/\d{13}/)
  if (lineIncludes13Number) {
    console.log(lineIncludes13Number)
    return {
      datetime: getDateString(new Date(lineIncludes13Number[0]))
    }
  }

  const lineIncludeNow = line.match(/now/)
  if (lineIncludeNow) {
    const now = Date.now()
    return {
      datetime: getDateString(new Date(now)),
      timestamp: now / 1000
    }
  }

  const timestamp = Date.parse(line)
  if (timestamp) {
    return {
      timestamp: timestamp / 1000
    }
  }

  return {}
}