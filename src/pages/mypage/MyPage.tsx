import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FAMILY_MENU_ITEMS, SETTING_MENU_ITEMS } from '../../features/mypage/constants'
import MenuSection from '../../features/mypage/components/MenuSection'
import ProfileCard from '../../features/mypage/components/ProfileCard'
import WithdrawButton from '../../features/mypage/components/WithdrawButton'
import { useLogoutMutation, useWithdrawMutation } from '../../features/auth/hooks/useAuthMutations'
import { getStoredAuthUser } from '../../features/auth/utils/tokenStorage'
import { ROUTE_PATHS } from '../../routes/routePaths'

function MyPage() {
  const navigate = useNavigate()
  const authUser = getStoredAuthUser()
  const logoutMutation = useLogoutMutation()
  const withdrawMutation = useWithdrawMutation()
  const isAuthActionPending = logoutMutation.isPending || withdrawMutation.isPending

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
        <MenuSection title="가족 · 여행 관리" items={FAMILY_MENU_ITEMS} />
        <MenuSection title="계정 · 앱 설정" items={settingMenuItems} />
        <WithdrawButton onClick={handleWithdraw} disabled={isAuthActionPending} />
      </div>
    </main>
  )
}

export default MyPage
