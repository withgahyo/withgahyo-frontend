export type CalendarCell = { date: Date } | null

export function getMonthMatrix(year: number, month: number): CalendarCell[][] {
  const firstDayOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingEmptyCount = firstDayOfMonth.getDay()

  const cells: CalendarCell[] = [
    ...Array.from({ length: leadingEmptyCount }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => ({
      date: new Date(year, month, index + 1),
    })),
  ]

  const weeks: CalendarCell[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  return weeks
}

export function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isDateInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false
  return date.getTime() > start.getTime() && date.getTime() < end.getTime()
}

export function isWeekend(date: Date) {
  const day = date.getDay()
  return day === 0 || day === 6
}
