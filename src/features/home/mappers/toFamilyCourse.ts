import type { HomeAlternativeCandidateResponse, HomeCourseResponse } from '../../../api/home'
import { formatDDay } from '../../../utils/dDay.ts'
import { parseLocalDate, WEEKDAY_LABELS } from '../../../utils/localDate.ts'
import type { AlternativeCourse, FamilyCourse } from '../types'

export { formatDDay }

export function formatCourseDate(startDate: string): string {
  const date = parseLocalDate(startDate)

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
