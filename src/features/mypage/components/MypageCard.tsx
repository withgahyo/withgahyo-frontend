import type { ReactNode } from 'react'

interface MypageCardProps {
  children: ReactNode
  className?: string
}

function MypageCard({ children, className = '' }: MypageCardProps) {
  return (
    <section
      className={`rounded-card border border-ink/6 bg-white shadow-[0_2px_12px_-6px_rgb(20_20_43/0.12)] ${className}`}
    >
      {children}
    </section>
  )
}

export default MypageCard
