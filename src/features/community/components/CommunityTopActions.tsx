import { Bell, MoreVertical } from 'lucide-react'

function CommunityTopActions() {
  return (
    <header className="flex items-center justify-end gap-3 text-brand-lime">
      <button type="button" aria-label="알림" className="rounded-full p-1">
        <Bell size={20} strokeWidth={2.2} />
      </button>
      <button type="button" aria-label="더보기" className="rounded-full p-1">
        <MoreVertical size={21} strokeWidth={2.6} />
      </button>
    </header>
  )
}

export default CommunityTopActions
