import test from 'node:test'
import assert from 'node:assert/strict'
import {
  formatDDay,
  formatCourseDate,
  toFamilyCourse,
  toAlternativeCourse,
} from '../src/features/home/mappers/toFamilyCourse.ts'

test('formats a positive days-until-trip as D-<n>', () => {
  assert.equal(formatDDay(6), 'D-6')
})

test('formats zero days-until-trip as D-Day', () => {
  assert.equal(formatDDay(0), 'D-Day')
})

test('clamps a negative days-until-trip safely to D-Day', () => {
  assert.equal(formatDDay(-3), 'D-Day')
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
