export type CommunityFeedTab = 'all' | 'mine'

export const COMMUNITY_FEED_TABS: Array<{
  value: CommunityFeedTab
  label: string
}> = [
  { value: 'all', label: '전체' },
  { value: 'mine', label: '내 후기' },
]

export function getCommunityFeedSectionTitles(tab: CommunityFeedTab) {
  if (tab === 'mine') {
    return ['미작성한 후기', '내가 작성한 후기']
  }

  return ['전체 여행 후기']
}

export function getCommunityFeedTabFromParam(value: string | null): CommunityFeedTab {
  return COMMUNITY_FEED_TABS.some((tab) => tab.value === value)
    ? (value as CommunityFeedTab)
    : 'all'
}
