import { Compass, Home, Image, Plus, User } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'

const TAB_ITEMS = [
  { to: ROUTE_PATHS.home, label: '홈', Icon: Home },
  { to: ROUTE_PATHS.popular, label: '인기 코스', Icon: Compass },
  { to: ROUTE_PATHS.albums, label: '앨범', Icon: Image },
  { to: ROUTE_PATHS.mypage, label: '마이페이지', Icon: User },
] as const

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
