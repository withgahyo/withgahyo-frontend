interface CommunityBackgroundLoopProps {
  variant?: 'list' | 'detail'
}

function CommunityBackgroundLoop({ variant = 'list' }: CommunityBackgroundLoopProps) {
  const positionClass =
    variant === 'detail'
      ? 'bottom-16 right-[-4.5rem] h-52 w-80'
      : '-bottom-20 -right-16 h-48 w-72'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-[55%] border-[18px] border-[#1f31e9] opacity-70 ${positionClass}`}
    />
  )
}

export default CommunityBackgroundLoop
