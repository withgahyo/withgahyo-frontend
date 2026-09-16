import { Bell, ChevronLeft, MoreVertical } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/routePaths'

interface CommunityDetailHeaderProps {
  title: string
  onBack: () => void
  onOpenMenu: () => void
}

function CommunityDetailHeader({ title, onBack, onOpenMenu }: CommunityDetailHeaderProps) {
  return (
    <header className="relative z-1 flex h-16 items-center justify-between px-5">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={onBack}
        className="rounded-full p-1 text-white"
      >
        <ChevronLeft size={28} strokeWidth={2.4} />
      </button>
      <h1 className="text-lg font-extrabold">{title}</h1>
      <div className="flex items-center gap-3 text-white">
        <Link to={ROUTE_PATHS.notifications} aria-label="알림" className="rounded-full p-1">
          <Bell size={19} strokeWidth={2.1} />
        </Link>
        <button
          type="button"
          aria-label="더보기"
          className="rounded-full p-1"
          onClick={onOpenMenu}
        >
          <MoreVertical size={21} strokeWidth={2.6} />
        </button>
      </div>
    </header>
  )
}

export default CommunityDetailHeader
