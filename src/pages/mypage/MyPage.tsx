import { FAMILY_MENU_ITEMS, SETTING_MENU_ITEMS } from '../../features/mypage/constants'
import MenuSection from '../../features/mypage/components/MenuSection'
import ProfileCard from '../../features/mypage/components/ProfileCard'
import WithdrawButton from '../../features/mypage/components/WithdrawButton'

function MyPage() {
  return (
    <main className="min-h-app bg-[#F6F7F2] px-5 pb-32 pt-6">
      <header className="mb-6 flex items-center justify-center">
        <h1 className="text-lg font-extrabold text-ink">마이페이지</h1>
      </header>

      <div className="space-y-5">
        <ProfileCard />
        <MenuSection title="가족 · 여행 관리" items={FAMILY_MENU_ITEMS} />
        <MenuSection title="계정 · 앱 설정" items={SETTING_MENU_ITEMS} />
        <WithdrawButton />
      </div>
    </main>
  )
}

export default MyPage
