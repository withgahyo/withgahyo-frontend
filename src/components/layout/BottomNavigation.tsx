import { Compass, Home, Image, Plus, User } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'

const TAB_ITEMS = [
  { to: ROUTE_PATHS.home, label: '홈', Icon: Home },
  { to: ROUTE_PATHS.popular, label: '인기 코스', Icon: Compass },
  { to: ROUTE_PATHS.albums, label: '앨범', Icon: Image },
  { to: ROUTE_PATHS.mypage, label: '마이페이지', Icon: User },
] as const

// nav 시각적 높이(하단 Safe Area 제외). MainTabLayout의 콘텐츠 하단 padding과 값을 맞춰야 한다.
const NAV_BAR_HEIGHT = 'h-[4.5rem]'

function BottomNavigation() {
  return (
    <nav
      aria-label="주요 메뉴"
      className="fixed bottom-0 left-1/2 z-10 w-full max-w-[430px] -translate-x-1/2 rounded-t-card bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_-4px_rgb(20_20_43/0.08)]"
    >
      <ul className={`relative flex items-center justify-between px-8 ${NAV_BAR_HEIGHT}`}>
        {TAB_ITEMS.slice(0, 2).map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink to={to}>
              {({ isActive }) => (
                <span
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
                    isActive ? 'text-brand-blue' : 'text-brand-blue/35'
                  }`}
                >
                  <Icon aria-hidden="true" size={22} />
                  {label}
                </span>
              )}
            </NavLink>
          </li>
        ))}

        <li aria-hidden="true" className="w-14" />

        {TAB_ITEMS.slice(2).map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink to={to}>
              {({ isActive }) => (
                <span
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
                    isActive ? 'text-brand-blue' : 'text-brand-blue/35'
                  }`}
                >
                  <Icon aria-hidden="true" size={22} />
                  {label}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <Link
        to={ROUTE_PATHS.courseCreateRegion}
        aria-label="코스 생성"
        className="absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-lime shadow-fab"
      >
        <Plus aria-hidden="true" size={28} className="text-brand-blue" />
      </Link>
    </nav>
  )
}

export default BottomNavigation
