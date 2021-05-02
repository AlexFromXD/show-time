function getDateString (d: Date): string {
  const dtf = new Intl.DateTimeFormat('en-ZA', {
    weekday: 'long', hour12: false,
    year: 'numeric', month: 'numeric', day: '2-digit',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  })
  return dtf.format(d)
}

type ParseResult = {
  origin: string;
  datetime?: string;
  timestamp?: number;
}

export function parseFocusLine (line: string): ParseResult[] {
  const tsList = line.match(/\d{13}|\d{10}/g)
  if (tsList) {
    return tsList.map(ts => {
      return {
        origin: ts,
        datetime: ts.length === 10
          ? getDateString(new Date(Number(ts) * 1000))
          : getDateString(new Date(Number(ts)))
      }
    })
  }

  const lineIncludeNow = line.match(/now/)
  if (lineIncludeNow) {
    const now = Date.now()
    return [{
      origin: 'now',
      datetime: getDateString(new Date(now)),
      timestamp: now / 1000
    }]
  }

  const timestamp = Date.parse(line)
  if (timestamp) {
    return [{
      origin: line,
      timestamp: timestamp / 1000
    }]
  }

  return []
}
