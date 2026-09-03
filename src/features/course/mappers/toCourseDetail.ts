import type { CourseDetailPlaceResponse, CourseDetailResponse } from '../../../api/course'
import type { CourseDetail, CoursePlace, PlaceCategory } from '../types'

const KNOWN_CATEGORIES: readonly PlaceCategory[] = [
  'BAKERY',
  'RESTAURANT',
  'NATURE',
  'CAFE',
  'ATTRACTION',
  'ETC',
]

// TODO(백엔드 확인 필요): 상세 응답의 place.category 실제 값(enum / 코드 / 카테고리 원문 경로)을
// 확인한 뒤 매핑 규칙을 추가한다. 확인 전까지는 우리 코드와 정확히 일치하는 값만 사용하고
// 그 외에는 기본 아이콘(ETC)으로 둔다 — 형식을 추측한 매핑은 넣지 않는다.
function toPlaceCategory(raw: string): PlaceCategory {
  return (KNOWN_CATEGORIES as readonly string[]).includes(raw) ? (raw as PlaceCategory) : 'ETC'
}

function toCoursePlace(place: CourseDetailPlaceResponse, index: number): CoursePlace {
  return {
    id: place.placeId,
    // 응답에 order가 없으므로 days를 펼친 순서(1-base)로 부여한다.
    order: index + 1,
    name: place.name,
    category: toPlaceCategory(place.category),
    latitude: place.latitude,
    longitude: place.longitude,
    address: place.address || undefined,
    imageUrl: place.imageUrl ?? undefined,
    // openingHours / travelTimeFromPrevious / travelMode: 현재 상세 응답에 없음 → 미설정
  }
}

export function toCourseDetail(response: CourseDetailResponse): CourseDetail {
  const places = response.days.flatMap((day) => day.places).map(toCoursePlace)

  return {
    id: String(response.courseId),
    title: response.title,
    places,
  }
}
