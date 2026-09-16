import test from 'node:test'
import assert from 'node:assert/strict'
import {
  COMMUNITY_FEED_TABS,
  getCommunityFeedTabFromParam,
  getCommunityFeedSectionTitles,
} from '../src/features/community/tabs.ts'
import { ROUTE_PATHS } from '../src/routes/routePaths.ts'
import {
  getCommunityPostCategoryLabel,
  getCommunityPostTitle,
} from '../src/features/community/utils.ts'

test('community feed uses two travel-review focused tabs', () => {
  assert.deepEqual(
    COMMUNITY_FEED_TABS.map((tab) => tab.label),
    ['전체', '내 후기'],
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

test('invalid community tab query falls back to all reviews', () => {
  assert.equal(getCommunityFeedTabFromParam('unknown'), 'all')
  assert.equal(getCommunityFeedTabFromParam(null), 'all')
})

test('community post display helpers read backend review fields', () => {
  const post = {
    courseTitle: '부산 효도여행 후기',
  }

  assert.equal(getCommunityPostTitle(post), '부산 효도여행 후기')
  assert.equal(getCommunityPostCategoryLabel(post), '후기')
})
