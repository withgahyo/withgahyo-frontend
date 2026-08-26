import { Plus, X } from 'lucide-react'
import MypageCard from './MypageCard'
import type { CourseFamilyMemberResponse } from '../../../api/course'

interface FamilyManagementSectionProps {
  familyMembers: CourseFamilyMemberResponse[]
  isLoading?: boolean
  errorMessage?: string
  removingId?: number | null
  onAddClick: () => void
  onRemove: (familyMemberId: number) => void
}

function FamilyManagementSection({
  familyMembers,
  isLoading = false,
  errorMessage,
  removingId = null,
  onAddClick,
  onRemove,
}: FamilyManagementSectionProps) {
  return (
    <section aria-labelledby="family-management-heading">
      <h2 id="family-management-heading" className="mb-3 px-1 text-sm font-bold text-ink/55">
        가족 관리
      </h2>

      <MypageCard className="overflow-hidden px-5">
        <div className="py-4">
          {isLoading && <p className="text-sm font-semibold text-ink/45">불러오는 중...</p>}
          {!isLoading && errorMessage && (
            <p className="text-sm font-semibold text-red-500">{errorMessage}</p>
          )}

          {!isLoading && !errorMessage && (
            <div className="flex gap-4 overflow-x-auto pb-1">
              {familyMembers.map((member) => (
                <div
                  key={member.familyMemberId}
                  className="relative flex w-16 shrink-0 flex-col items-center gap-2"
                >
                  <span className="relative">
                    {member.profileImageUrl ? (
                      <img
                        src={member.profileImageUrl}
                        alt=""
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-sm font-extrabold text-ink/50">
                        {member.nickname.slice(0, 1)}
                      </span>
                    )}
                    <button
                      type="button"
                      disabled={removingId === member.familyMemberId}
                      onClick={() => onRemove(member.familyMemberId)}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-ink/45 shadow-sm ring-1 ring-ink/10 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                      aria-label={`${member.nickname} 가족 연결 해제`}
                    >
                      <X size={12} aria-hidden="true" strokeWidth={2.4} />
                    </button>
                  </span>
                  <span className="max-w-full truncate text-xs font-semibold text-ink">
                    {member.nickname}
                  </span>
                </div>
              ))}

              <button
                type="button"
                onClick={onAddClick}
                className="flex w-16 shrink-0 flex-col items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                aria-label="가족 구성원 추가하기"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-lime text-brand-blue">
                  <Plus size={28} strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold text-ink">추가하기</span>
              </button>
            </div>
          )}
        </div>
      </MypageCard>
    </section>
  )
}

export default FamilyManagementSection
