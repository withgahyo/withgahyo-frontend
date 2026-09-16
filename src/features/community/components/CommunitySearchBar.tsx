import { Search, SlidersHorizontal } from 'lucide-react'

interface CommunitySearchBarProps {
  value: string
  onChange: (value: string) => void
  onOpenFilter: () => void
  selectedRegionLabel: string
  isFilterActive: boolean
}

function CommunitySearchBar({
  value,
  onChange,
  onOpenFilter,
  selectedRegionLabel,
  isFilterActive,
}: CommunitySearchBarProps) {
  return (
    <div className="mt-6">
      <label className="flex h-11 items-center rounded-full bg-white px-4 text-xs text-[#a5a8b7] shadow-[0_8px_18px_rgb(0_0_0/0.12)]">
        <Search aria-hidden="true" size={22} className="mr-2.5 text-[#d7d8df]" />
        <span className="sr-only">커뮤니티 검색</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none placeholder:text-[#b6b8c5]"
          placeholder="커뮤니티에서 이야기나 정보를 검색해보세요!"
        />
        <button
          type="button"
          onClick={onOpenFilter}
          className={[
            'ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition',
            isFilterActive ? 'bg-brand-lime text-brand-blue' : 'text-[#b6b8c5]',
          ].join(' ')}
          aria-label={`지역 필터 열기: ${selectedRegionLabel}`}
        >
          <SlidersHorizontal aria-hidden="true" size={18} />
        </button>
      </label>
    </div>
  )
}

export default CommunitySearchBar
