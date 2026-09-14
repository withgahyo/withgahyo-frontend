import { useEffect, useRef } from 'react'

interface ConfirmLeaveModalProps {
  isOpen: boolean
  title: string
  description: string
  /** 계속 보기 (현재 화면 유지) */
  onStay: () => void
  /** 나가기 (요청했던 navigation 진행) */
  onLeave: () => void
}

// 코스 생성/추천 확정 전 이탈을 확인하는 공용 모달. window.confirm 대신 사용한다.
function ConfirmLeaveModal({
  isOpen,
  title,
  description,
  onStay,
  onLeave,
}: ConfirmLeaveModalProps) {
  const stayButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    stayButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onStay()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onStay])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/40" onClick={onStay} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-leave-title"
        aria-describedby="confirm-leave-description"
        className="relative w-full max-w-[340px] rounded-2xl bg-white p-7 text-center shadow-xl"
      >
        <p id="confirm-leave-title" className="text-base font-bold text-ink">
          {title}
        </p>
        <p
          id="confirm-leave-description"
          className="mt-2 whitespace-pre-line text-sm text-gray-500"
        >
          {description}
        </p>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onLeave}
            className="flex-1 rounded-2xl border border-gray-300 py-2 text-sm font-semibold text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            나가기
          </button>
          <button
            ref={stayButtonRef}
            type="button"
            onClick={onStay}
            className="flex-1 rounded-2xl bg-brand-blue py-2 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            계속 보기
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmLeaveModal
