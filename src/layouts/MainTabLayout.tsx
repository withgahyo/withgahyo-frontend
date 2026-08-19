import { Outlet } from 'react-router-dom'
import BottomNavigation from '../components/layout/BottomNavigation'

function MainTabLayout() {
  return (
    // BottomNavigation은 fixed로 떠 있어 AppContainer의 하단 Safe Area padding 밖으로 벗어난다.
    // -mb로 그 padding을 상쇄하고, 대신 flex-1에 nav 실제 높이(+ 하단 Safe Area)만큼만 padding을 준다.
    <div className="flex min-h-full flex-col -mb-[env(safe-area-inset-bottom)]">
      <div className="flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  )
}

export default MainTabLayout
