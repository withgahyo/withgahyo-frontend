import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'
import PrimaryButton from '../../../components/common/PrimaryButton'
import type { FamilyMemberCandidateResponse } from '../../../api/course'

interface FamilyMemberConnectSheetProps {
  isOpen: boolean
  email: string
  candidate: FamilyMemberCandidateResponse | null
  relationship: string
  isFinding: boolean
  isConnecting: boolean
  findError: Error | null
  connectError: Error | null
  onEmailChange: (email: string) => void
  onRelationshipChange: (relationship: string) => void
  onFind: () => void
  onConnect: () => void
  onClose: () => void
}

const RELATIONSHIP_OPTIONS = ['부모', '배우자', '자녀', '형제/자매', '조부모', '기타']

function FamilyMemberConnectSheet({
  isOpen,
  email,
  candidate,
  relationship,
  isFinding,
  isConnecting,
  findError,
  connectError,
  onEmailChange,
  onRelationshipChange,
  onFind,
  onConnect,
  onClose,
}: FamilyMemberConnectSheetProps) {
  // isOpen이 false로 바뀌어도 닫힘 애니메이션이 끝날 때까지 DOM에 남겨둔다.
  const [isRendered, setIsRendered] = useState(isOpen)
  const [isRelationshipOpen, setIsRelationshipOpen] = useState(false)
  const [relationshipDropdownStyle, setRelationshipDropdownStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    maxHeight: 176,
  })
  const relationshipDropdownRef = useRef<HTMLDivElement>(null)

  const updateRelationshipDropdownStyle = () => {
    const rect = relationshipDropdownRef.current?.getBoundingClientRect()
    if (!rect) return

    setRelationshipDropdownStyle({
      left: rect.left,
      top: rect.bottom + 8,
      width: rect.width,
      maxHeight: Math.max(window.innerHeight - rect.bottom - 24, 96),
    })
  }

  useEffect(() => {
    if (!isRelationshipOpen) return

    updateRelationshipDropdownStyle()

    const handlePointerDown = (event: PointerEvent) => {
      if (!relationshipDropdownRef.current?.contains(event.target as Node)) {
        setIsRelationshipOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsRelationshipOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', updateRelationshipDropdownStyle)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updateRelationshipDropdownStyle)
    }
  }, [isRelationshipOpen])

  // prop → state 동기화는 렌더 중에 처리한다(effect 아님): 열리면 즉시 마운트해 slide-in을 재생.
  if (isOpen && !isRendered) {
    setIsRendered(true)
  }

  // 닫히면 slide-out 애니메이션이 끝난 뒤 언마운트한다.
  // (관계 드롭다운은 바깥 pointerdown 리스너가 같은 클릭에서 알아서 닫는다.)
  useEffect(() => {
    if (isOpen || !isRendered) return

    const timer = window.setTimeout(() => setIsRendered(false), 240)
    return () => window.clearTimeout(timer)
  }, [isOpen, isRendered])

  if (!isRendered) return null

  const isClosing = !isOpen
  const canFind = Boolean(email.trim()) && !isFinding
  const canConnect =
    Boolean(candidate) &&
    !candidate?.alreadyConnected &&
    Boolean(relationship.trim()) &&
    !isConnecting

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <button
        type="button"
        aria-label="가족 구성원 연결 닫기"
        className={`absolute inset-0 cursor-default bg-black/40 motion-reduce:animate-none ${
          isClosing ? 'animate-overlay-out' : 'animate-overlay-in'
        }`}
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="family-connect-title"
        className={`relative w-full rounded-t-card bg-white px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5 shadow-xl motion-reduce:animate-none ${
          isClosing ? 'animate-sheet-out' : 'animate-sheet-in'
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="family-connect-title" className="text-lg font-semibold text-ink">
            가족 구성원 연결
          </h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-ink">
            이메일
            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-brand-blue">
              <input
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && canFind) {
                    onFind()
                  }
                }}
                placeholder="가족의 가입 이메일을 입력해주세요"
                className="min-w-0 flex-1 text-sm text-ink outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                aria-label="회원 찾기"
                disabled={!canFind}
                onClick={onFind}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white disabled:bg-gray-200 disabled:text-gray-400"
              >
                <Search aria-hidden="true" size={16} />
              </button>
            </div>
          </label>

          {isFinding && <p className="text-sm text-gray-400">회원을 찾고 있어요...</p>}
          {findError && <p className="text-sm text-red-500">{findError.message}</p>}

          {candidate && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {candidate.profileImageUrl ? (
                  <img
                    src={candidate.profileImageUrl}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-500">
                    {candidate.nickname.slice(0, 1)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{candidate.nickname}</p>
                  <p className="truncate text-sm text-gray-400">{candidate.maskedEmail}</p>
                </div>
              </div>

              {candidate.alreadyConnected ? (
                <p className="text-sm text-gray-500">이미 연결된 가족 구성원이에요.</p>
              ) : (
                <div
                  ref={relationshipDropdownRef}
                  className="relative flex flex-col gap-2 text-sm font-medium text-ink"
                >
                  관계
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isRelationshipOpen}
                    onClick={() => setIsRelationshipOpen((isOpen) => !isOpen)}
                    className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-sm text-ink outline-none transition focus:border-brand-blue"
                  >
                    <span>{relationship}</span>
                    <ChevronDown
                      aria-hidden="true"
                      size={18}
                      className={`text-gray-500 transition-transform ${
                        isRelationshipOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isRelationshipOpen && (
                    <div
                      role="listbox"
                      aria-label="관계 선택"
                      style={relationshipDropdownStyle}
                      className="fixed z-50 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-1 shadow-[0_12px_32px_rgba(15,23,42,0.14)]"
                    >
                      {RELATIONSHIP_OPTIONS.map((option) => {
                        const isSelected = relationship === option

                        return (
                          <button
                            key={option}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              onRelationshipChange(option)
                              setIsRelationshipOpen(false)
                            }}
                            className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm transition ${
                              isSelected ? 'bg-gray-50 text-ink' : 'text-ink hover:bg-gray-50'
                            }`}
                          >
                            <span>{option}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {connectError && <p className="text-sm text-red-500">{connectError.message}</p>}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full bg-gray-100 py-4 text-base font-semibold text-gray-500"
            >
              취소
            </button>
            <PrimaryButton disabled={!canConnect} onClick={onConnect}>
              {isConnecting ? '연결 중...' : '연결하기'}
            </PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FamilyMemberConnectSheet
