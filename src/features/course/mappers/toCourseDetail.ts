import type { CourseDetailResponse } from '../../../api/course'
import type { CourseDetail, CoursePlace, TravelMode } from '../types'

// toCourseDetail(최종 코스) / toCandidateDetailView(추천 후보) 가 공유하는 최소 형태.
// 두 응답의 place 는 필드가 조금 다르지만 아래 필드는 공통이다.
interface FlattenablePlace {
  placeId: number
  order: number
  name: string
  category: string
  latitude: number
  longitude: number
  transportToNext: {
    mode: string | null
    durationMinutes: number | null
    distanceMeters: number | null
  }
}

interface FlattenableDay {
  day: number
  places: FlattenablePlace[]
}

function toTravelMode(mode: string | null): TravelMode | undefined {
  if (mode === 'WALK') return 'WALK'
  if (mode === 'CAR') return 'CAR'
  return undefined
}

/**
 * days[] 를 화면용 CoursePlace[] 로 평탄화한다.
 * - place.order 는 일자마다 1부터 다시 시작하므로 전역 순번(index + 1)을 새로 매긴다.
 * - 원본 day 값은 CoursePlace.day 로 보존한다 (Day 구분 헤더용).
 * - transportToNext 는 "다음 장소로의" 이동이므로, 다음 장소의 travelTimeFromPrevious 로 옮긴다.
 */
export function daysToCoursePlaces(days: FlattenableDay[]): CoursePlace[] {
  const flat = days.flatMap((d) => d.places.map((place) => ({ place, day: d.day })))

  return flat.map(({ place, day }, index) => {
    const previous = index > 0 ? flat[index - 1].place : null
    return {
      id: place.placeId,
      order: index + 1,
      day,
      name: place.name,
      category: place.category,
      latitude: place.latitude,
      longitude: place.longitude,
      travelTimeFromPrevious: previous?.transportToNext.durationMinutes ?? undefined,
      travelMode: previous ? toTravelMode(previous.transportToNext.mode) : undefined,
    }
  })
}

export function toCourseDetail(response: CourseDetailResponse): CourseDetail {
  return {
    id: String(response.courseId),
    title: response.title,
    places: daysToCoursePlaces(response.days),
  }
}
