import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getCommunityLikeAction,
  getCommunityLikePresentation,
} from '../src/features/community/likeAction.ts'

test('community like action chooses like request for unliked posts', () => {
  assert.equal(getCommunityLikeAction({ likedByMe: false }), 'like')
  assert.equal(getCommunityLikeAction({}), 'like')
})

test('community like action chooses unlike request for liked posts', () => {
  assert.equal(getCommunityLikeAction({ likedByMe: true }), 'unlike')
})

test('community like presentation reflects current liked state', () => {
  assert.deepEqual(getCommunityLikePresentation({ likedByMe: true, likeCount: 7 }), {
    ariaLabel: '좋아요 취소',
    count: 7,
    isLiked: true,
  })
  assert.deepEqual(getCommunityLikePresentation({ likedByMe: false, likeCount: 2 }), {
    ariaLabel: '좋아요',
    count: 2,
    isLiked: false,
  })
})
