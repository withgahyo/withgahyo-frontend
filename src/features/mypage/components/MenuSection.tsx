import { useId } from 'react'
import type { LucideIcon } from 'lucide-react'
import MenuItemButton from './MenuItemButton'
import MypageCard from './MypageCard'

interface MenuSectionItem {
  label: string
  description?: string
  Icon: LucideIcon
  TrailingIcon?: LucideIcon
  isDanger?: boolean
  onClick?: () => void
  disabled?: boolean
}

interface MenuSectionProps {
  title: string
  items: readonly MenuSectionItem[]
}

function MenuSection({ title, items }: MenuSectionProps) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="mb-3 px-1 text-sm font-bold text-ink/55">
        {title}
      </h2>
      <MypageCard className="px-5">
        {items.map((item, index) => (
          <div key={item.label} className={index > 0 ? 'border-t border-ink/7' : undefined}>
            <MenuItemButton {...item} />
          </div>
        ))}
      </MypageCard>
    </section>
  )
}

export default MenuSection
