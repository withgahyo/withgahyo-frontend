export function formatDDay(daysUntilTrip: number): string {
  if (daysUntilTrip > 0) return `D-${daysUntilTrip}`
  if (daysUntilTrip === 0) return 'D-Day'
  return `D+${Math.abs(daysUntilTrip)}`
}
