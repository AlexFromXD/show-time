function getDateString (date: Date): string {
  const weekMap: { [index: number]: string } = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }
  return `${weekMap[date.getUTCDay()]}, ${date.toISOString()}`
}

type ParseResult = {
  origin: string;
  datetime?: string;
  timestamp?: number;
}

export function parseFocusLine (line: string): ParseResult[] {

  const result: ParseResult[] = []

  const lineIncludeNow = line.match(/now/)
  if (lineIncludeNow) {
    const now = new Date(Date.now())

    result.push({
      origin: 'now',
      datetime: getDateString(now),
      timestamp: now.getTime() / 1000
    })
  }

  const tsList = line.match(/\d{10}\.\d{1,3}|\d{13}|\d{10}/g)
  if (tsList) {
    result.push(...tsList.map(ts => {
      return {
        origin: ts,
        datetime: ts.length === 13 && !ts.includes('.')
          ? getDateString(new Date(Number(ts)))
          : getDateString(new Date(Number(ts) * 1000))
      }
    }))
  }

  const dateStringList = line.match(/(\d{4}(-|\/)\d{1,2}(-|\/)\d{1,2}T\d{2}:\d{2}:\d{2}\.\d{3})|(\d{4}(-|\/)\d{1,2}(-|\/)\d{1,2}T\d{2}:\d{2}:\d{2})|(\d{4}(-|\/)\d{1,2}(-|\/)\d{1,2})/g)
  if (dateStringList) {
    result.push(...dateStringList.map(date => {
      return {
        origin: date,
        timestamp: new Date(date).getTime() / 1000
      }
    }))
  }

  return result
}
