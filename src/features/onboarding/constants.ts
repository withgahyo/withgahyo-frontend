export interface DurationOption {
  id: string
  title: string
  description: string
}

export const DURATION_OPTIONS: DurationOption[] = [
  { id: 'day-trip', title: '당일치기', description: '가볍게 다녀오는 여행' },
  { id: 'one-night', title: '1박 2일', description: '여유롭게 머무는 여행' },
  { id: 'two-nights', title: '2박 3일', description: '충분히 둘러보는 여행' },
]

export interface PreferenceImageOption {
  id: string
  label: string
  /** TODO: 실제 취향 이미지 asset 준비되면 교체 */
  imageSrc: string | null
}

// TODO: 실제 관광 취향 이미지 asset 준비되면 imageSrc 채우기
export const TOURISM_PREFERENCE_OPTIONS: PreferenceImageOption[] = Array.from(
  { length: 9 },
  (_, index) => ({
    id: `tourism-${index + 1}`,
    label: `관광 취향 이미지 ${index + 1}`,
    imageSrc: null,
  }),
)

// TODO: 실제 식사 취향 이미지 asset 준비되면 imageSrc 채우기
export const FOOD_PREFERENCE_OPTIONS: PreferenceImageOption[] = Array.from(
  { length: 9 },
  (_, index) => ({
    id: `food-${index + 1}`,
    label: `식사 취향 이미지 ${index + 1}`,
    imageSrc: null,
  }),
)

export interface ConditionChoice {
  id: string
  label: string
}

export const WALKING_TIME_OPTIONS: ConditionChoice[] = [
  { id: 'under-10min', label: '10분 이하' },
  { id: 'under-30min', label: '30분 이내' },
  { id: 'over-1hour', label: '1시간 이상' },
]

export const REST_NEED_OPTIONS: ConditionChoice[] = [
  { id: 'frequent', label: '자주 쉬어야 함' },
  { id: 'moderate', label: '중간에 쉬어야 함' },
  { id: 'none', label: '상관없음' },
]

export const STAIRS_TOLERANCE_OPTIONS: ConditionChoice[] = [
  { id: 'none', label: '없음' },
  { id: 'moderate', label: '보통' },
  { id: 'avoid', label: '피하고 싶음' },
]

export const FACILITY_OPTIONS: ConditionChoice[] = [
  { id: 'elevator', label: '엘리베이터' },
  { id: 'wheelchair-access', label: '휠체어 접근' },
  { id: 'indoor-space', label: '실내공간' },
  { id: 'nursing-room', label: '수유실' },
  { id: 'parking', label: '주차장' },
  { id: 'bench', label: '벤치' },
]

export const MEAL_CAUTION_OPTIONS: ConditionChoice[] = [
  { id: 'none', label: '상관없어요' },
  { id: 'a-little', label: '조금만 먹어요' },
  { id: 'avoid', label: '피하고 싶어요' },
]
