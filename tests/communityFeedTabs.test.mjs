import test from 'node:test'
import assert from 'node:assert/strict'
import {
  COMMUNITY_FEED_TABS,
  getCommunityFeedSectionTitles,
} from '../src/features/community/tabs.ts'

test('community feed uses three travel-review focused tabs', () => {
  assert.deepEqual(
    COMMUNITY_FEED_TABS.map((tab) => tab.label),
    ['추천', '전체', '내 후기'],
  )
})

test('my review feed exposes pending and written review sections', () => {
  assert.deepEqual(getCommunityFeedSectionTitles('mine'), [
    '미작성한 후기',
    '내가 작성한 후기',
  ])
})
