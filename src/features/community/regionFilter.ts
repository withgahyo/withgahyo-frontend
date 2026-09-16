export const ALL_COMMUNITY_REGIONS = 'all'

export interface CommunityRegionFilter {
  value: string
  label: string
}

export const COMMUNITY_REGION_FILTERS: CommunityRegionFilter[] = [
  { value: ALL_COMMUNITY_REGIONS, label: '전체 지역' },
  { value: '서울', label: '서울' },
  { value: '인천', label: '인천' },
  { value: '대전', label: '대전' },
  { value: '대구', label: '대구' },
  { value: '광주', label: '광주' },
  { value: '부산', label: '부산' },
  { value: '울산', label: '울산' },
  { value: '세종', label: '세종' },
  { value: '경기', label: '경기' },
  { value: '강원', label: '강원' },
  { value: '충북', label: '충북' },
  { value: '충남', label: '충남' },
  { value: '경북', label: '경북' },
  { value: '경남', label: '경남' },
  { value: '전북', label: '전북' },
  { value: '전남', label: '전남' },
  { value: '제주', label: '제주' },
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
