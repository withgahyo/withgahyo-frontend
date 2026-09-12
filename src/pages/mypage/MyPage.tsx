import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { MY_INFO_MENU_ITEMS, SETTING_MENU_ITEMS } from '../../features/mypage/constants'
import MenuSection from '../../features/mypage/components/MenuSection'
import FamilyManagementSection from '../../features/mypage/components/FamilyManagementSection'
import MypageHero from '../../features/mypage/components/MypageHero'
import WithdrawButton from '../../features/mypage/components/WithdrawButton'
import { useLogoutMutation, useWithdrawMutation } from '../../features/auth/hooks/useAuthMutations'
import { getStoredAuthUser } from '../../features/auth/utils/tokenStorage'
import { ROUTE_PATHS } from '../../routes/routePaths'
import { queryKeys } from '../../constants/queryKeys'
import {
  connectFamilyMember,
  type CourseFamilyMemberResponse,
  disconnectFamilyMember,
  findFamilyMemberCandidate,
  getCourseFamilyMembers,
} from '../../api/course'
import FamilyMemberConnectSheet from '../../features/course/components/FamilyMemberConnectSheet'

function MyPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const authUser = getStoredAuthUser()
  const logoutMutation = useLogoutMutation()
  const withdrawMutation = useWithdrawMutation()
  const isAuthActionPending = logoutMutation.isPending || withdrawMutation.isPending
  const [isFamilySheetOpen, setIsFamilySheetOpen] = useState(false)
  const [familyEmail, setFamilyEmail] = useState('')
  const [familyRelationship, setFamilyRelationship] = useState('부모')
  const [disconnectTarget, setDisconnectTarget] = useState<CourseFamilyMemberResponse | null>(null)

  const familyMembersQuery = useQuery({
    queryKey: queryKeys.courseFamilyMembers,
    queryFn: getCourseFamilyMembers,
  })
  const findFamilyCandidateMutation = useMutation({
    mutationFn: findFamilyMemberCandidate,
  })
  const connectFamilyMemberMutation = useMutation({
    mutationFn: connectFamilyMember,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.courseFamilyMembers })
      closeFamilySheet()
    },
  })
  const disconnectFamilyMemberMutation = useMutation({
    mutationFn: disconnectFamilyMember,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.courseFamilyMembers })
      setDisconnectTarget(null)
    },
  })

  const settingMenuItems = useMemo(
    () =>
      SETTING_MENU_ITEMS.map((item) => {
        if (item.label !== '로그아웃') {
          return item
        }

        return {
          ...item,
          description: logoutMutation.isPending ? '로그아웃 중입니다' : item.description,
          disabled: isAuthActionPending,
          onClick: () => {
            logoutMutation.mutate(undefined, {
              onSettled: () => {
                navigate(ROUTE_PATHS.login, { replace: true })
              },
            })
          },
        }
      }),
    [isAuthActionPending, logoutMutation, navigate],
  )
  const myInfoMenuItems = useMemo(
    () =>
      MY_INFO_MENU_ITEMS.map((item) => {
        if (item.label === '나의 여행 취향 관리') {
          return {
            ...item,
            onClick: () => navigate(ROUTE_PATHS.mypagePreferences),
          }
        }
        if (item.label === '개인정보 관리') {
          return {
            ...item,
            onClick: () => navigate(ROUTE_PATHS.mypageProfile),
          }
        }
        return item
      }),
    [navigate],
  )
  const resolvedSettingMenuItems = useMemo(
    () =>
      settingMenuItems.map((item) => {
        if (item.label === '알림 설정') {
          return {
            ...item,
            onClick: () => navigate(ROUTE_PATHS.notifications),
          }
        }
        if (item.label === '고객센터') {
          return {
            ...item,
            onClick: () => navigate(ROUTE_PATHS.support),
          }
        }
        if (item.label === '이용약관') {
          return {
            ...item,
            onClick: () => navigate(ROUTE_PATHS.terms),
          }
        }
        return item
      }),
    [navigate, settingMenuItems],
  )
  const closeFamilySheet = () => {
    setIsFamilySheetOpen(false)
    setFamilyEmail('')
    setFamilyRelationship('부모')
    findFamilyCandidateMutation.reset()
    connectFamilyMemberMutation.reset()
  }

  const handleFindFamilyCandidate = () => {
    const email = familyEmail.trim()
    if (!email) return
    connectFamilyMemberMutation.reset()
    findFamilyCandidateMutation.mutate(email)
  }

  const handleConnectFamilyMember = () => {
    const candidate = findFamilyCandidateMutation.data
    if (!candidate || candidate.alreadyConnected) return

    connectFamilyMemberMutation.mutate({
      familyUserId: candidate.userId,
      relationship: familyRelationship,
    })
  }

  const handleWithdraw = () => {
    if (!window.confirm('회원 탈퇴 후에는 계정 정보를 복구할 수 없어요. 탈퇴하시겠어요?')) {
      return
    }

    withdrawMutation.mutate(undefined, {
      onSuccess: () => {
        navigate(ROUTE_PATHS.login, { replace: true })
      },
      onError: () => {
        window.alert('회원 탈퇴에 실패했어요. 잠시 후 다시 시도해 주세요.')
      },
    })
  }

  return (
    // Home과 동일한 배경 bleed 패턴: 위로 Safe Area(top)까지 Blue를 확장하고,
    // 아래 흰 Content Sheet가 BottomNavigation(fixed, 4.5rem) 뒤까지 이어지도록
    // 시트가 nav 높이 + 마지막 콘텐츠 여백(2.5rem, Home 최하단 섹션과 동일)을 직접 가진다.
    <main className="relative -mt-[env(safe-area-inset-top)] flex min-h-app flex-col bg-brand-blue pt-[env(safe-area-inset-top)]">
      <MypageHero user={authUser} />

      <div className="relative -mt-6 flex-1 rounded-t-card bg-surface-muted px-6 pb-[calc(4.5rem+2.5rem+env(safe-area-inset-bottom))] pt-7">
        <div className="space-y-8">
          <MenuSection title="내 정보" items={myInfoMenuItems} />
          <FamilyManagementSection
            familyMembers={familyMembersQuery.data?.familyMembers ?? []}
            isLoading={familyMembersQuery.isLoading}
            errorMessage={
              familyMembersQuery.isError ? '가족 구성원을 불러오지 못했습니다.' : undefined
            }
            removingId={
              disconnectFamilyMemberMutation.isPending
                ? disconnectFamilyMemberMutation.variables ?? null
                : null
            }
            onAddClick={() => setIsFamilySheetOpen(true)}
            onRemove={(familyMember) => {
              disconnectFamilyMemberMutation.reset()
              setDisconnectTarget(familyMember)
            }}
          />
          <MenuSection title="설정" items={resolvedSettingMenuItems} />
          <WithdrawButton onClick={handleWithdraw} disabled={isAuthActionPending} />
        </div>
      </div>

      <FamilyMemberConnectSheet
        isOpen={isFamilySheetOpen}
        email={familyEmail}
        candidate={findFamilyCandidateMutation.data ?? null}
        relationship={familyRelationship}
        isFinding={findFamilyCandidateMutation.isPending}
        isConnecting={connectFamilyMemberMutation.isPending}
        findError={findFamilyCandidateMutation.error ?? null}
        connectError={connectFamilyMemberMutation.error ?? null}
        onEmailChange={(email) => {
          setFamilyEmail(email)
          findFamilyCandidateMutation.reset()
          connectFamilyMemberMutation.reset()
        }}
        onRelationshipChange={setFamilyRelationship}
        onFind={handleFindFamilyCandidate}
        onConnect={handleConnectFamilyMember}
        onClose={closeFamilySheet}
      />
      {disconnectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <button
            type="button"
            aria-label="가족 연결 해제 취소"
            className="absolute inset-0 cursor-default bg-black/40"
            onClick={() => {
              if (!disconnectFamilyMemberMutation.isPending) {
                setDisconnectTarget(null)
              }
            }}
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="disconnect-family-title"
            className="relative w-full max-w-sm rounded-card bg-white p-5 shadow-xl"
          >
            <h2 id="disconnect-family-title" className="text-lg font-extrabold text-ink">
              가족 연결을 해제할까요?
            </h2>
            <p className="mt-3 text-sm font-medium leading-6 text-ink/55">
              {disconnectTarget.nickname}님과의 연결이 해제됩니다.
            </p>
            <div className="mt-5 flex flex-col items-center rounded-2xl bg-surface-muted px-4 py-5 text-center">
              {disconnectTarget.profileImageUrl ? (
                <img
                  src={disconnectTarget.profileImageUrl}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-sm font-extrabold text-ink/50">
                  {disconnectTarget.nickname.slice(0, 1)}
                </span>
              )}
              <p className="mt-2 max-w-full truncate text-sm font-bold text-ink">
                {disconnectTarget.nickname}
              </p>
              <p className="mt-0.5 max-w-full truncate text-xs font-semibold text-ink/45">
                {disconnectTarget.relationship}
              </p>
            </div>
            {disconnectFamilyMemberMutation.isError && (
              <p className="mt-3 text-sm font-semibold text-red-500">
                가족 연결 해제에 실패했어요. 잠시 후 다시 시도해 주세요.
              </p>
            )}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={disconnectFamilyMemberMutation.isPending}
                onClick={() => setDisconnectTarget(null)}
                className="h-12 rounded-2xl bg-gray-100 text-sm font-bold text-ink/60 disabled:cursor-not-allowed disabled:opacity-50"
              >
                취소
              </button>
              <button
                type="button"
                disabled={disconnectFamilyMemberMutation.isPending}
                onClick={() => disconnectFamilyMemberMutation.mutate(disconnectTarget.familyMemberId)}
                className="h-12 rounded-2xl bg-brand-blue text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {disconnectFamilyMemberMutation.isPending ? '해제 중...' : '해제하기'}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default MyPage
