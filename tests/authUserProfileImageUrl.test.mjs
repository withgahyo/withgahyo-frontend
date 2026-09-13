import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeAuthUser } from '../src/features/auth/utils/tokenStorage.ts'

test('normalizes relative auth user profile image urls against the API base url', () => {
  const user = normalizeAuthUser(
    {
      userId: 1,
      nickname: '가효',
      profileImageUrl: '/uploads/profile/image.png',
    },
    'https://api.withgahyo.test',
  )

  assert.equal(user.profileImageUrl, 'https://api.withgahyo.test/uploads/profile/image.png')
})

test('keeps absolute auth user profile image urls unchanged', () => {
  const user = normalizeAuthUser(
    {
      userId: 1,
      nickname: '가효',
      profileImageUrl: 'https://cdn.withgahyo.test/profile/image.png',
    },
    'https://api.withgahyo.test',
  )

  assert.equal(user.profileImageUrl, 'https://cdn.withgahyo.test/profile/image.png')
})
