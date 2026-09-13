export const REVIEW_HIGHLIGHT_OPTIONS = [
  { value: 'COURSE', label: '여행 코스' },
  { value: 'ACCESSIBILITY', label: '편의시설' },
  { value: 'FOOD', label: '음식' },
  { value: 'MEMORY', label: '기억' },
  { value: 'TRANSPORT', label: '교통' },
  { value: 'RECOMMENDABLE', label: '추천할만' },
] as const

export const REVIEW_RECOMMENDATION_RANGE = {
  min: 0,
  max: 10,
  defaultValue: 2,
} as const
