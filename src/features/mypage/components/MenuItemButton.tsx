import type { LucideIcon } from 'lucide-react'

interface MenuItemButtonProps {
  label: string
  description?: string
  Icon: LucideIcon
  TrailingIcon?: LucideIcon
  isDanger?: boolean
  onClick?: () => void
  disabled?: boolean
}

function MenuItemButton({
  label,
  description,
  Icon,
  TrailingIcon,
  isDanger = false,
  onClick,
  disabled = false,
}: MenuItemButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center gap-3 py-4 text-left transition-opacity active:opacity-70 disabled:cursor-not-allowed disabled:opacity-55"
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
          isDanger ? 'bg-red-50 text-red-500' : 'bg-brand-lime/45 text-brand-blue'
        }`}
      >
        <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-base font-semibold ${isDanger ? 'text-red-500' : 'text-ink'}`}>
          {label}
        </span>
        {description && <span className="mt-1 block text-sm text-ink/45">{description}</span>}
      </span>
      {TrailingIcon && (
        <TrailingIcon aria-hidden="true" size={20} strokeWidth={2.2} className="text-ink/35" />
      )}
    </button>
  )
}

export default MenuItemButton
