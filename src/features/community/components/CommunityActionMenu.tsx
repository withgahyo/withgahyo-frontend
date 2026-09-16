interface CommunityActionMenuProps {
  isPending: boolean
  onClose: () => void
  onReport: () => void
  onBlock: () => void
  onShare: () => void
}

function CommunityActionMenu({
  isPending,
  onClose,
  onReport,
  onBlock,
  onShare,
}: CommunityActionMenuProps) {
  return (
    <div className="fixed inset-0 z-20 bg-[#08147a]/62" onClick={onClose}>
      <div
        role="menu"
        aria-label="커뮤니티 게시글 메뉴"
        className="absolute right-5 top-[calc(5.25rem+env(safe-area-inset-top))] w-[245px] overflow-hidden rounded-2xl bg-brand-blue shadow-[0_18px_35px_rgb(0_0_0/0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <ActionMenuButton label="신고하기" onClick={onReport} disabled={isPending} />
        <ActionMenuButton label="차단하기" onClick={onBlock} disabled={isPending} />
        <ActionMenuButton label="URL 공유하기" onClick={onShare} disabled={isPending} />
      </div>
    </div>
  )
}

function ActionMenuButton({
  label,
  onClick,
  disabled,
}: {
  label: string
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className="flex h-15 w-full items-center gap-2 border-b border-white/10 px-5 text-left text-sm font-bold text-white last:border-b-0 disabled:text-white/45"
    >
      <span className="text-lg text-brand-lime">›</span>
      {label}
    </button>
  )
}

export default CommunityActionMenu
