import type { PlaceCategory } from '../types'

// 백엔드 category enum이 완전히 확정되지 않아, 알 수 없는 값은 원본 문자열을 그대로 노출한다.
// 확인된 값: TOURIST_ATTRACTION / TOUR / ATTRACTION / NATURE / CULTURE / WALK / FOOD / RESTAURANT / CAFE / BAKERY.
const PLACE_CATEGORY_LABELS: Record<string, string> = {
  TOURIST_ATTRACTION: '관광지',
  TOUR: '관광지',
  ATTRACTION: '관광지',
  NATURE: '자연',
  CULTURE: '문화',
  WALK: '산책',
  FOOD: '맛집',
  RESTAURANT: '맛집',
  CAFE: '카페',
  BAKERY: '베이커리',
}

export function getPlaceCategoryLabel(category: PlaceCategory | null | undefined): string | null {
  if (!category) return null
  return PLACE_CATEGORY_LABELS[category] ?? category
}
