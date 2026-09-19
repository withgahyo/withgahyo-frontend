import type { HomeCourseResponse } from '../../../api/home'

/**
 * Home 코스 목록 표시 순서를 정한다.
 * 1) 오늘/다가오는 여행(daysUntilTrip >= 0)을 먼저, 가장 가까운 여행부터
 * 2) 지난 여행(daysUntilTrip < 0)은 모두 그 뒤에, 가장 최근에 다녀온 여행부터
 * Backend가 내려준 순서에 의존하지 않고 Frontend에서 명시적으로 정렬하며,
 * 원본 배열은 mutate하지 않는다(alternativeCandidates 등 Course 객체 전체가 함께 이동).
 */
export function sortFamilyCoursesForHome(courses: HomeCourseResponse[]): HomeCourseResponse[] {
  return [...courses].sort((a, b) => {
    const aUpcoming = a.daysUntilTrip >= 0
    const bUpcoming = b.daysUntilTrip >= 0

    if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1
    // 둘 다 오늘/미래: daysUntilTrip 오름차순(가까운 여행부터)
    if (aUpcoming) return a.daysUntilTrip - b.daysUntilTrip
    // 둘 다 과거: daysUntilTrip 내림차순(0에 가까울수록, 즉 최근 여행부터)
    return b.daysUntilTrip - a.daysUntilTrip
  })
}
