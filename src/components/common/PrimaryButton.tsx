import type { ButtonHTMLAttributes } from 'react'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'lime'
}

function PrimaryButton({
  className = '',
  disabled,
  variant = 'default',
  children,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      className={`w-full rounded-full py-4 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
        disabled
          ? 'cursor-not-allowed bg-gray-200 text-gray-400'
          : `bg-brand-blue ${variant === 'lime' ? 'text-brand-lime' : 'text-white'}`
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
