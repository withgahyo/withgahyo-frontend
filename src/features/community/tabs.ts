export type CommunityFeedTab = 'recommended' | 'all' | 'mine'

export const COMMUNITY_FEED_TABS: Array<{
  value: CommunityFeedTab
  label: string
}> = [
  { value: 'recommended', label: '추천' },
  { value: 'all', label: '전체' },
  { value: 'mine', label: '내 후기' },
]

export function getCommunityFeedSectionTitles(tab: CommunityFeedTab) {
  if (tab === 'mine') {
    return ['미작성한 후기', '내가 작성한 후기']
  }

  if (tab === 'recommended') {
    return ['부모님이 가장 만족한 여행후기']
  }

  return ['가족 여행 전 꼭 봐야할 글']
}
