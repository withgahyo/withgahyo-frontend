import { COMMUNITY_FEED_TABS, type CommunityFeedTab } from '../tabs'

interface CommunityCategoryTabsProps {
  selectedTab: CommunityFeedTab
  onSelect: (tab: CommunityFeedTab) => void
}

function CommunityCategoryTabs({ selectedTab, onSelect }: CommunityCategoryTabsProps) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2 rounded-full bg-[#1b2ee9]/70 p-1.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
      {COMMUNITY_FEED_TABS.map((tab) => {
        const isSelected = selectedTab === tab.value

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onSelect(tab.value)}
            className={`h-9 rounded-full text-[13px] font-extrabold transition-colors ${
              isSelected
                ? 'bg-brand-lime text-brand-blue shadow-[0_4px_10px_rgb(0_0_0/0.12)]'
                : 'text-white/75'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default CommunityCategoryTabs
