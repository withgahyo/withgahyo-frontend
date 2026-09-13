import { Edit3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/routePaths'

function CommunityWriteButton() {
  return (
    <Link
      to={ROUTE_PATHS.community}
      aria-label="커뮤니티 글쓰기"
      className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-[calc(50%-196px)] z-10 flex h-14 w-14 items-center justify-center rounded-full bg-brand-lime text-brand-blue shadow-fab active:scale-95"
    >
      <Edit3 size={27} strokeWidth={2.2} />
    </Link>
  )
}

export default CommunityWriteButton
