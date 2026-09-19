import type { HomeAlternativeCandidateResponse, HomeCourseResponse } from '../../../api/home'
import type { AlternativeCourse, FamilyCourse } from '../types'

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

export function formatDDay(daysUntilTrip: number): string {
  if (daysUntilTrip > 0) return `D-${daysUntilTrip}`
  if (daysUntilTrip === 0) return 'D-Day'
  return `D+${Math.abs(daysUntilTrip)}`
}

// "YYYY-MM-DD"를 직접 split해 연/월/일을 로컬 타임존으로 조립한다.
// new Date("YYYY-MM-DD")는 UTC 자정으로 해석되어 timezone에 따라 하루 밀릴 수 있어 피한다.
export function formatCourseDate(startDate: string): string {
  const [year, month, day] = startDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${WEEKDAY_LABELS[date.getDay()]})`
}

export function toAlternativeCourse(candidate: HomeAlternativeCandidateResponse): AlternativeCourse {
  return {
    id: String(candidate.candidateId),
    title: candidate.title,
    summary: candidate.summary,
    imageUrl: candidate.thumbnailImageUrl,
  }
}

export function toFamilyCourse(course: HomeCourseResponse): FamilyCourse {
  return {
    id: String(course.courseId),
    title: course.title,
    region: course.regionName,
    imageUrl: course.imageUrl,
    dDay: formatDDay(course.daysUntilTrip),
    date: formatCourseDate(course.startDate),
    tags: course.tags,
    alternativeCandidates: course.alternativeCandidates.map(toAlternativeCourse),
    isPastTrip: course.daysUntilTrip < 0,
  }
}

export function toFamilyCourses(courses: HomeCourseResponse[]): FamilyCourse[] {
  return courses.map(toFamilyCourse)
}
