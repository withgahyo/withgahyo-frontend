import { Search, SlidersHorizontal } from 'lucide-react'

interface CommunitySearchBarProps {
  value: string
  onChange: (value: string) => void
}

function CommunitySearchBar({ value, onChange }: CommunitySearchBarProps) {
  return (
    <label className="mt-6 flex h-11 items-center rounded-full bg-white px-4 text-xs text-[#a5a8b7] shadow-[0_8px_18px_rgb(0_0_0/0.12)]">
      <Search aria-hidden="true" size={22} className="mr-2.5 text-[#d7d8df]" />
      <span className="sr-only">커뮤니티 검색</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none placeholder:text-[#b6b8c5]"
        placeholder="커뮤니티에서 이야기나 정보를 검색해보세요!"
      />
      <SlidersHorizontal aria-hidden="true" size={18} className="text-[#b6b8c5]" />
    </label>
  )
}

export default CommunitySearchBar
