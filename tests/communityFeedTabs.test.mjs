import test from 'node:test'
import assert from 'node:assert/strict'
import {
  COMMUNITY_FEED_TABS,
  getCommunityFeedTabFromParam,
  getCommunityFeedSectionTitles,
} from '../src/features/community/tabs.ts'
import { ROUTE_PATHS } from '../src/routes/routePaths.ts'

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

test('community tab query resolves to mine when returning from my review routes', () => {
  assert.equal(ROUTE_PATHS.communityWithTab('mine'), '/community?tab=mine')
  assert.equal(getCommunityFeedTabFromParam('mine'), 'mine')
})

test('invalid community tab query falls back to recommended', () => {
  assert.equal(getCommunityFeedTabFromParam('unknown'), 'recommended')
  assert.equal(getCommunityFeedTabFromParam(null), 'recommended')
})
