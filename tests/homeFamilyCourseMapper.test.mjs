import test from 'node:test'
import assert from 'node:assert/strict'
import {
  formatDDay,
  formatCourseDate,
  toFamilyCourse,
  toAlternativeCourse,
} from '../src/features/home/mappers/toFamilyCourse.ts'
import { sortFamilyCoursesForHome } from '../src/features/home/utils/sortFamilyCourses.ts'
import { ROUTE_PATHS } from '../src/routes/routePaths.ts'

test('formats a positive days-until-trip as D-<n>', () => {
  assert.equal(formatDDay(5), 'D-5')
  assert.equal(formatDDay(1), 'D-1')
})

test('formats zero days-until-trip as D-Day', () => {
  assert.equal(formatDDay(0), 'D-Day')
})

test('formats a negative days-until-trip as D+<n> instead of clamping to D-Day', () => {
  assert.equal(formatDDay(-1), 'D+1')
  assert.equal(formatDDay(-10), 'D+10')
})

test('formats a date-only string as month/day/weekday without shifting a day', () => {
  assert.equal(formatCourseDate('2026-09-25'), '9월 25일 (금)')
})

test('maps a home course response to the family course view model', () => {
  const course = toFamilyCourse({
    courseId: 12,
    title: '대전 가족 여행',
    regionName: '대전',
    imageUrl: 'https://example.com/image.jpg',
    startDate: '2026-09-25',
    daysUntilTrip: 6,
    tags: ['문화', '맛집'],
    alternativeCandidates: [],
  })

  assert.deepEqual(course, {
    id: '12',
    title: '대전 가족 여행',
    region: '대전',
    imageUrl: 'https://example.com/image.jpg',
    dDay: 'D-6',
    date: '9월 25일 (금)',
    tags: ['문화', '맛집'],
    alternativeCandidates: [],
    isPastTrip: false,
  })
})

test('maps an alternative candidate response to the view model', () => {
  const candidate = toAlternativeCourse({
    candidateId: 101,
    title: '여유롭게 즐기는 대전 여행',
    summary: '가족과 함께 천천히 둘러보기 좋은 코스입니다.',
    thumbnailImageUrl: 'https://example.com/candidate.jpg',
  })

  assert.deepEqual(candidate, {
    id: '101',
    title: '여유롭게 즐기는 대전 여행',
    summary: '가족과 함께 천천히 둘러보기 좋은 코스입니다.',
    imageUrl: 'https://example.com/candidate.jpg',
  })
})

test('maps an alternative candidate with a null thumbnail without throwing', () => {
  const candidate = toAlternativeCourse({
    candidateId: 103,
    title: '자연과 함께하는 대전 하루',
    summary: '산책과 휴식을 중심으로 구성한 코스입니다.',
    thumbnailImageUrl: null,
  })

  assert.equal(candidate.imageUrl, null)
})

test('maps a family course carrying multiple alternative candidates, preserving order', () => {
  const course = toFamilyCourse({
    courseId: 9127,
    title: '대전 가족 여행',
    regionName: '대전',
    imageUrl: null,
    startDate: '2026-09-25',
    daysUntilTrip: 6,
    tags: ['문화', '맛집'],
    alternativeCandidates: [
      {
        candidateId: 101,
        title: '여유롭게 즐기는 대전 여행',
        summary: '가족과 함께 천천히 둘러보기 좋은 코스입니다.',
        thumbnailImageUrl: null,
      },
      {
        candidateId: 103,
        title: '자연과 함께하는 대전 하루',
        summary: '산책과 휴식을 중심으로 구성한 코스입니다.',
        thumbnailImageUrl: null,
      },
    ],
  })

  assert.deepEqual(
    course.alternativeCandidates.map((candidate) => candidate.id),
    ['101', '103'],
  )
})

test('marks a future trip as not past', () => {
  const course = toFamilyCourse({
    courseId: 1,
    title: 't',
    regionName: '대전',
    imageUrl: null,
    startDate: '2026-09-25',
    daysUntilTrip: 5,
    tags: [],
    alternativeCandidates: [],
  })

  assert.equal(course.isPastTrip, false)
})

test('marks a today trip as not past', () => {
  const course = toFamilyCourse({
    courseId: 1,
    title: 't',
    regionName: '대전',
    imageUrl: null,
    startDate: '2026-09-25',
    daysUntilTrip: 0,
    tags: [],
    alternativeCandidates: [],
  })

  assert.equal(course.isPastTrip, false)
})

test('marks a past trip (negative daysUntilTrip) as past', () => {
  const course = toFamilyCourse({
    courseId: 1,
    title: 't',
    regionName: '대전',
    imageUrl: null,
    startDate: '2026-09-07',
    daysUntilTrip: -13,
    tags: [],
    alternativeCandidates: [],
  })

  assert.equal(course.isPastTrip, true)
  // dDay 문자열이 아니라 원본 daysUntilTrip에서 계산된 값임을 함께 확인한다.
  assert.equal(course.dDay, 'D+13')
})

test('resolves the review write route from a course id', () => {
  assert.equal(ROUTE_PATHS.review('9108'), '/reviews/9108')
})

function stubCourse(courseId, daysUntilTrip) {
  return {
    courseId,
    title: `course-${courseId}`,
    regionName: '대전',
    imageUrl: null,
    startDate: '2026-09-25',
    daysUntilTrip,
    tags: [],
    alternativeCandidates: [{ candidateId: courseId * 100, title: 't', summary: 's', thumbnailImageUrl: null }],
  }
}

test('sorts multiple upcoming trips by nearest date first', () => {
  const courses = [stubCourse(1, 30), stubCourse(2, 2), stubCourse(3, 10)]

  assert.deepEqual(
    sortFamilyCoursesForHome(courses).map((c) => c.daysUntilTrip),
    [2, 10, 30],
  )
})

test('places a today trip before future trips', () => {
  const courses = [stubCourse(1, 5), stubCourse(2, 0)]

  assert.deepEqual(
    sortFamilyCoursesForHome(courses).map((c) => c.daysUntilTrip),
    [0, 5],
  )
})

test('places past trips after every today/upcoming trip', () => {
  const courses = [stubCourse(1, -3), stubCourse(2, 5)]

  assert.deepEqual(
    sortFamilyCoursesForHome(courses).map((c) => c.daysUntilTrip),
    [5, -3],
  )
})

test('sorts multiple past trips by most recently taken first', () => {
  const courses = [stubCourse(1, -30), stubCourse(2, -1), stubCourse(3, -7)]

  assert.deepEqual(
    sortFamilyCoursesForHome(courses).map((c) => c.daysUntilTrip),
    [-1, -7, -30],
  )
})

test('sorts a mixed list into upcoming (ascending) then past (most recent first)', () => {
  const courses = [
    stubCourse(1, -30),
    stubCourse(2, 10),
    stubCourse(3, -2),
    stubCourse(4, 0),
    stubCourse(5, 3),
  ]

  assert.deepEqual(
    sortFamilyCoursesForHome(courses).map((c) => c.daysUntilTrip),
    [0, 3, 10, -2, -30],
  )
})

test('keeps alternativeCandidates attached to their own course after sorting', () => {
  const courses = [stubCourse(1, -30), stubCourse(2, 10)]

  const sorted = sortFamilyCoursesForHome(courses)

  assert.deepEqual(
    sorted.map((c) => [c.courseId, c.alternativeCandidates[0].candidateId]),
    [
      [2, 200],
      [1, 100],
    ],
  )
})

test('does not mutate the original array or its course objects', () => {
  const courses = [stubCourse(1, -30), stubCourse(2, 10)]
  const original = [...courses]

  sortFamilyCoursesForHome(courses)

  assert.deepEqual(courses, original)
})
