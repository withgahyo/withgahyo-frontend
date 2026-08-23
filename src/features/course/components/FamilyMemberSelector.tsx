import { Check, Plus } from 'lucide-react'
import FormSectionLabel from './FormSectionLabel'
import type { FamilyMemberOption } from '../types'

interface FamilyMemberSelectorProps {
  familyMembers: FamilyMemberOption[]
  isLoading?: boolean
  errorMessage?: string
  selectedIds: number[]
  onToggle: (id: number) => void
}

function FamilyMemberSelector({
  familyMembers,
  isLoading = false,
  errorMessage,
  selectedIds,
  onToggle,
}: FamilyMemberSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <FormSectionLabel>함께 갈 가족 구성원</FormSectionLabel>

      {isLoading && <p className="text-sm text-gray-400">가족 구성원을 불러오는 중...</p>}
      {!isLoading && errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      <div className="flex gap-4 overflow-x-auto py-1">
        {!isLoading &&
          !errorMessage &&
          familyMembers.map((member) => {
            const isSelected = selectedIds.includes(member.id)
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => onToggle(member.id)}
                aria-pressed={isSelected}
                className="flex shrink-0 flex-col items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <span className="relative">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${
                      isSelected ? 'bg-brand-lime' : 'bg-gray-200'
                    }`}
                  />
                  {isSelected && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-white"
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </span>
                <span className="text-xs font-medium text-ink">{member.name}</span>
              </button>
            )
          })}

        <button
          type="button"
          // TODO: 가족 구성원 추가 페이지/API 연동 후 실제 이동 처리
          onClick={() => {}}
          aria-label="구성원 추가하기"
          className="flex shrink-0 flex-col items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200">
            <Plus aria-hidden="true" size={22} className="text-gray-500" />
          </span>
          <span className="text-xs font-medium text-ink">구성원 추가하기</span>
        </button>
      </div>
    </div>
  )
}

export default FamilyMemberSelector
