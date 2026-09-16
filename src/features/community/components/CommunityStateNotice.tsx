interface CommunityStateNoticeProps {
  title: string
  description?: string
}

function CommunityStateNotice({ title, description }: CommunityStateNoticeProps) {
  return (
    <div className="rounded-xl bg-[#071ed8]/80 px-4 py-5 text-center shadow-[0_8px_18px_rgb(0_0_0/0.14)]">
      <p className="text-[13px] font-extrabold text-white">{title}</p>
      {description && (
        <p className="mt-2 text-xs font-medium leading-relaxed text-white/65">{description}</p>
      )}
    </div>
  )
}

export default CommunityStateNotice
