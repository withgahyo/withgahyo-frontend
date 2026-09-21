export const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

// "YYYY-MM-DD"를 직접 split해 연/월/일을 로컬 타임존으로 조립한다.
// new Date("YYYY-MM-DD")는 UTC 자정으로 해석되어 timezone에 따라 하루 밀릴 수 있어 피한다.
export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}
