import { Compass, Home, Image, Plus, User } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'

const TAB_ITEMS = [
  { to: ROUTE_PATHS.home, label: '홈', Icon: Home },
  { to: ROUTE_PATHS.popular, label: '인기 코스', Icon: Compass },
  { to: ROUTE_PATHS.albums, label: '앨범', Icon: Image },
  { to: ROUTE_PATHS.mypage, label: '마이페이지', Icon: User },
] as const

// TODO: 탭바 실제 디자인 적용 시 fixed/sticky 전환 + 높이 확정 + 중앙 플로팅 버튼과 함께
// pb-[env(safe-area-inset-bottom)]과 MainTabLayout 하단 padding을 재검토할 것.
// (AppContainer의 Safe Area는 normal-flow 요소만 보호하며, fixed로 전환되는 순간
// AppContainer 바깥으로 벗어나므로 이 컴포넌트가 직접 하단 Safe Area를 책임져야 함)
function BottomNavigation() {
  return (
    <nav aria-label="주요 메뉴">
      <ul className="flex items-center justify-between">
        {TAB_ITEMS.slice(0, 2).map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink to={to}>
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>
                  <Icon aria-hidden="true" />
                  {label}
                </span>
              )}
            </NavLink>
          </li>
        ))}

        <li>
          <Link to={ROUTE_PATHS.courseCreateRegion} aria-label="코스 생성">
            <Plus aria-hidden="true" />
          </Link>
        </li>

        {TAB_ITEMS.slice(2).map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink to={to}>
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>
                  <Icon aria-hidden="true" />
                  {label}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default BottomNavigation
