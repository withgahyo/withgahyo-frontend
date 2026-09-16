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

test('community region filters match backend area code regions', () => {
  assert.deepEqual(
    COMMUNITY_REGION_FILTERS.map((filter) => filter.label),
    [
      '전체 지역',
      '서울',
      '인천',
      '대전',
      '대구',
      '광주',
      '부산',
      '울산',
      '세종',
      '경기',
      '강원',
      '충북',
      '충남',
      '경북',
      '경남',
      '전북',
      '전남',
      '제주',
    ],
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
