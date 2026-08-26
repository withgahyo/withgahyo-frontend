import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { SETTING_MENU_ITEMS, TRAVEL_MENU_ITEMS } from '../../features/mypage/constants'
import MenuSection from '../../features/mypage/components/MenuSection'
import FamilyManagementSection from '../../features/mypage/components/FamilyManagementSection'
import ProfileCard from '../../features/mypage/components/ProfileCard'
import WithdrawButton from '../../features/mypage/components/WithdrawButton'
import { useLogoutMutation, useWithdrawMutation } from '../../features/auth/hooks/useAuthMutations'
import { getStoredAuthUser } from '../../features/auth/utils/tokenStorage'
import { ROUTE_PATHS } from '../../routes/routePaths'
import { queryKeys } from '../../constants/queryKeys'
import {
  connectFamilyMember,
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
    },
    onError: () => {
      window.alert('가족 연결 해제에 실패했어요. 잠시 후 다시 시도해 주세요.')
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
    <main className="min-h-app bg-[#F6F7F2] px-5 pb-32 pt-6">
      <header className="mb-6 flex items-center justify-center">
        <h1 className="text-lg font-extrabold text-ink">마이페이지</h1>
      </header>

      <div className="space-y-5">
        <ProfileCard user={authUser} />
        <FamilyManagementSection
          familyMembers={familyMembersQuery.data?.familyMembers ?? []}
          isLoading={familyMembersQuery.isLoading}
          errorMessage={familyMembersQuery.isError ? '가족 구성원을 불러오지 못했습니다.' : undefined}
          removingId={
            disconnectFamilyMemberMutation.isPending
              ? disconnectFamilyMemberMutation.variables ?? null
              : null
          }
          onAddClick={() => setIsFamilySheetOpen(true)}
          onRemove={(familyMemberId) => {
            if (!window.confirm('가족 연결을 해제할까요?')) return
            disconnectFamilyMemberMutation.mutate(familyMemberId)
          }}
        />
        <MenuSection title="여행 관리" items={TRAVEL_MENU_ITEMS} />
        <MenuSection title="계정 · 앱 설정" items={settingMenuItems} />
        <WithdrawButton onClick={handleWithdraw} disabled={isAuthActionPending} />
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
    </main>
  )
}

export default MyPage
