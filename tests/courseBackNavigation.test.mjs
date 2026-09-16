import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getCourseBackDestination,
  MY_REVIEW_FEED_BACK_TO,
} from '../src/features/course/backNavigation.ts'

test('course detail returns to my review feed when opened from a written review preview flow', () => {
  assert.equal(getCourseBackDestination(MY_REVIEW_FEED_BACK_TO), '/community?tab=mine')
})

test('course detail falls back to browser history without an explicit destination', () => {
  assert.equal(getCourseBackDestination(undefined), null)
})
