export const ALL_COMMUNITY_REGIONS = 'all'

export interface CommunityRegionFilter {
  value: string
  label: string
}

export const COMMUNITY_REGION_FILTERS: CommunityRegionFilter[] = [
  { value: ALL_COMMUNITY_REGIONS, label: '전체 지역' },
  { value: '대전', label: '대전' },
  { value: '부산', label: '부산' },
]

export function getCommunityRegionFilterLabel(value: string) {
  return (
    COMMUNITY_REGION_FILTERS.find((filter) => filter.value === value)?.label ??
    COMMUNITY_REGION_FILTERS[0].label
  )
}

export function buildCommunityPostParams({
  keyword,
  regionName,
}: {
  keyword: string
  regionName: string
}) {
  return {
    ...(keyword.trim() ? { keyword: keyword.trim() } : {}),
    ...(regionName !== ALL_COMMUNITY_REGIONS ? { regionName } : {}),
    sort: 'latest',
    size: 10,
  }
}
