import test from 'node:test'
import assert from 'node:assert/strict'
import {
  REVIEW_HIGHLIGHT_OPTIONS,
  REVIEW_RECOMMENDATION_RANGE,
} from '../src/features/review/formOptions.ts'

test('review form exposes six travel highlight options', () => {
  assert.deepEqual(
    REVIEW_HIGHLIGHT_OPTIONS.map((option) => option.label),
    ['여행 코스', '편의시설', '음식', '기억', '교통', '추천할만'],
  )
})

test('review recommendation range uses a ten point scale', () => {
  assert.deepEqual(REVIEW_RECOMMENDATION_RANGE, {
    min: 0,
    max: 10,
    defaultValue: 2,
  })
})
