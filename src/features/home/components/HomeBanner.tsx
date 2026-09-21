import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/routePaths'

function HomeBanner() {
  return (
    <Link
      to={ROUTE_PATHS.community}
      className="flex w-full items-center gap-4 rounded-2xl border border-white/20 bg-white/15 px-5 py-4 text-left shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] backdrop-blur-md transition-colors active:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-lime"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-white">여행 이야기를 나눠보세요!</p>
        <p className="mt-1 text-xs leading-5 text-white/70">
          다른 가족들의 여행 후기를 보고 우리 가족의 추억도 공유해보세요.
        </p>
      </div>

      <ArrowRight aria-hidden="true" size={24} strokeWidth={2} className="shrink-0 text-brand-lime" />
    </Link>
  )
}

export default HomeBanner
