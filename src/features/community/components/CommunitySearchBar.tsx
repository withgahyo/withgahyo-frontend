import { Search, SlidersHorizontal } from 'lucide-react'

function CommunitySearchBar() {
  return (
    <label className="mt-8 flex h-10 items-center rounded-full bg-white px-4 text-xs text-[#a5a8b7] shadow-[0_8px_18px_rgb(0_0_0/0.12)]">
      <Search aria-hidden="true" size={22} className="mr-2 text-[#d7d8df]" />
      <span className="sr-only">커뮤니티 검색</span>
      <input
        className="min-w-0 flex-1 bg-transparent text-[11px] outline-none placeholder:text-[#b6b8c5]"
        placeholder="커뮤니티에서 이야기나 정보를 검색해보세요!"
      />
      <SlidersHorizontal aria-hidden="true" size={17} className="text-[#b6b8c5]" />
    </label>
  )
}

export default CommunitySearchBar
