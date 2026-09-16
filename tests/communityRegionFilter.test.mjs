import test from 'node:test'
import assert from 'node:assert/strict'
import {
  COMMUNITY_REGION_FILTERS,
  buildCommunityPostParams,
  getCommunityRegionFilterLabel,
} from '../src/features/community/regionFilter.ts'

test('community region filters include all region option first', () => {
  assert.equal(COMMUNITY_REGION_FILTERS[0].value, 'all')
  assert.equal(COMMUNITY_REGION_FILTERS[0].label, '전체 지역')
})

test('community region filters match supported community review regions without Seoul', () => {
  assert.deepEqual(
    COMMUNITY_REGION_FILTERS.map((filter) => filter.label),
    ['전체 지역', '대전', '부산'],
  )
})

test('community post params combine keyword and selected region', () => {
  assert.deepEqual(buildCommunityPostParams({ keyword: '효도', regionName: '부산' }), {
    keyword: '효도',
    regionName: '부산',
    sort: 'latest',
    size: 10,
  })
})

test('community post params omit blank keyword and all region', () => {
  assert.deepEqual(buildCommunityPostParams({ keyword: '   ', regionName: 'all' }), {
    sort: 'latest',
    size: 10,
  })
})

test('community region label falls back to all region', () => {
  assert.equal(getCommunityRegionFilterLabel('부산'), '부산')
  assert.equal(getCommunityRegionFilterLabel('unknown'), '전체 지역')
})
