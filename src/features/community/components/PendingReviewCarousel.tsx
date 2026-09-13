import { ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { COMMUNITY_THUMBNAILS } from '../mock'
import CommunityStateNotice from './CommunityStateNotice'

export interface PendingReviewItem {
  id: number
  title: string
  dateRange: string
  location: string
}

interface PendingReviewCarouselProps {
  items: PendingReviewItem[]
}

function PendingReviewCarousel({ items }: PendingReviewCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  if (items.length === 0) {
    return (
      <div className="mt-4 px-5">
        <CommunityStateNotice
          title="아직 작성할 후기가 없어요."
          description="여행을 다녀오면 이곳에서 후기를 작성할 수 있어요."
        />
      </div>
    )
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const nextIndex = Math.round(container.scrollLeft / container.clientWidth)
    setActiveIndex(Math.min(items.length - 1, Math.max(0, nextIndex)))
  }

  return (
    <div>
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1"
      >
        {items.map((item, index) => (
          <article
            key={item.id}
            className="flex min-h-22 w-[calc(100%-2rem)] shrink-0 snap-center items-center rounded-xl bg-[#071ed8] p-3 shadow-[0_8px_18px_rgb(0_0_0/0.18)]"
          >
            <img
              src={COMMUNITY_THUMBNAILS[index % COMMUNITY_THUMBNAILS.length]}
              alt=""
              className="h-14 w-14 shrink-0 rounded-md object-cover"
            />
            <div className="min-w-0 flex-1 px-3">
              <span className="rounded-full bg-brand-lime px-2 py-0.5 text-[9px] font-black text-brand-blue">
                후기
              </span>
              <h3 className="mt-1 truncate text-[13px] font-extrabold text-white">
                {item.title}
              </h3>
              <p className="mt-1 truncate text-[9px] font-semibold text-white/60">
                {item.location} · {item.dateRange}
              </p>
            </div>
            <ChevronRight
              aria-hidden="true"
              size={28}
              strokeWidth={2.6}
              className="text-brand-lime"
            />
          </article>
        ))}
      </div>

      {items.length > 1 && (
        <div aria-hidden="true" className="mt-2 flex justify-center gap-1.5">
          {items.map((item, index) => (
            <span
              key={item.id}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                index === activeIndex ? 'bg-brand-lime' : 'bg-white/45'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PendingReviewCarousel
