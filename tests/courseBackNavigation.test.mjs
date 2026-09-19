import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getCourseBackDestination,
  getReviewFormBackDestination,
  MY_REVIEW_FEED_BACK_TO,
} from '../src/features/course/backNavigation.ts'

test('course detail returns to my review feed when opened from a written review preview flow', () => {
  assert.equal(getCourseBackDestination(MY_REVIEW_FEED_BACK_TO), '/community?tab=mine')
})

test('course detail falls back to browser history without an explicit destination', () => {
  assert.equal(getCourseBackDestination(undefined), null)
})

test('review form returns to home when opened from the Home past-trip review button', () => {
  assert.equal(getReviewFormBackDestination({ backTo: '/home' }), '/home')
})

test('review form falls back to the community mine tab without an explicit backTo', () => {
  assert.equal(getReviewFormBackDestination(null), '/community?tab=mine')
  assert.equal(getReviewFormBackDestination(undefined), '/community?tab=mine')
})
