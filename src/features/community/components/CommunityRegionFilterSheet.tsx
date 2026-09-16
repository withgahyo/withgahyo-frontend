import { Check, X } from 'lucide-react'
import { COMMUNITY_REGION_FILTERS } from '../regionFilter'

interface CommunityRegionFilterSheetProps {
  selectedRegion: string
  onSelect: (region: string) => void
  onClose: () => void
}

function CommunityRegionFilterSheet({
  selectedRegion,
  onSelect,
  onClose,
}: CommunityRegionFilterSheetProps) {
  return (
    <div className="fixed inset-0 z-30 flex items-end bg-black/45" role="presentation">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="지역 필터 닫기"
        onClick={onClose}
      />
      <section
        className="relative w-full rounded-t-[1.75rem] bg-white px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4 text-ink shadow-[0_-16px_32px_rgb(0_0_0/0.25)]"
        aria-label="지역 필터"
      >
        <div className="mx-auto h-1.5 w-12 rounded-full bg-ink/12" />
        <div className="mt-5 flex items-center justify-between">
          <h2 className="text-base font-black text-ink">지역 선택</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink/55"
            aria-label="닫기"
          >
            <X aria-hidden="true" size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {COMMUNITY_REGION_FILTERS.map((filter) => {
            const isSelected = selectedRegion === filter.value

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => onSelect(filter.value)}
                className={[
                  'flex h-11 items-center justify-between rounded-xl border px-4 text-sm font-extrabold transition',
                  isSelected
                    ? 'border-brand-blue bg-brand-blue text-white'
                    : 'border-ink/10 bg-white text-ink/70',
                ].join(' ')}
              >
                {filter.label}
                {isSelected && <Check aria-hidden="true" size={17} strokeWidth={3} />}
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default CommunityRegionFilterSheet
