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

export const BURDENSOME_FOOD_OPTIONS: ConditionChoice[] = [
  { id: 'spicy', label: '매운 음식' },
  { id: 'fried', label: '튀김류' },
  { id: 'flour', label: '밀가루' },
  { id: 'meat', label: '육류' },
  { id: 'seafood', label: '해산물' },
  { id: 'alcohol', label: '술' },
]
