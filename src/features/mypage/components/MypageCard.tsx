import type { ReactNode } from 'react'

interface MypageCardProps {
  children: ReactNode
  className?: string
}

function MypageCard({ children, className = '' }: MypageCardProps) {
  return (
    <section
      className={`rounded-3xl bg-white shadow-[0_10px_30px_-20px_rgb(20_20_43/0.45)] ${className}`}
    >
      {children}
    </section>
  )
}

export default MypageCard
