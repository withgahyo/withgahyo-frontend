import { Outlet } from 'react-router-dom'
import BottomNavigation from '../components/layout/BottomNavigation'

function MainTabLayout() {
  return (
    // BottomNavigation은 fixed로 떠 있어 AppContainer의 하단 Safe Area padding 밖으로 벗어난다.
    // -mb로 그 padding을 상쇄한다. nav 높이만큼의 하단 여백은 여기서 일괄로 주지 않고
    // 각 페이지가 직접 갖도록 한다 — 그래야 그 여백을 페이지 자신의 배경색으로 칠할 수 있다
    // (여기서 padding으로 주면 그 영역은 배경이 없는 빈 공간이라, 페이지 배경색이 스크롤
    // 최하단까지 이어지지 않고 탭바 위에서 끊겨 보이는 문제가 있었다).
    <div className="flex min-h-full flex-col -mb-[env(safe-area-inset-bottom)]">
      <div className="flex-1">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  )
}

export default MainTabLayout
