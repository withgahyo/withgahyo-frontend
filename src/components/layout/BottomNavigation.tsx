import { Home, Image, Map, Plus, User } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'

const TAB_ITEMS = [
  { to: ROUTE_PATHS.home, label: '홈', Icon: Home },
  { to: ROUTE_PATHS.popular, label: '인기 코스', Icon: Map },
  { to: ROUTE_PATHS.albums, label: '앨범', Icon: Image },
  { to: ROUTE_PATHS.mypage, label: '마이페이지', Icon: User },
] as const

// nav 시각적 높이(하단 Safe Area 제외). MainTabLayout의 콘텐츠 하단 padding과 값을 맞춰야 한다.
const NAV_BAR_HEIGHT = 'h-[4.5rem]'

// Plus 버튼(5rem/80px)보다 커야 버튼 둘레에 페이지 배경이 살짝 보이는 링이 생긴다.
const NOTCH_RADIUS_REM = 3
const NOTCH_MASK = `radial-gradient(circle at 50% 0%, transparent ${NOTCH_RADIUS_REM}rem, black calc(${NOTCH_RADIUS_REM}rem + 1px))`

function BottomNavigation() {
  return (
    // Plus 버튼은 nav의 형제로 분리한다. nav에 걸리는 mask(notch)가 자식 전체에
    // 적용되기 때문에, 버튼이 nav의 자식이면 notch 구멍 안에서 버튼 아랫부분까지
    // 함께 마스킹되어 사라진다.
    // 위로 드리우는 분리용 shadow는 wrapper(비마스킹)에 둔다.
    // nav 자체는 notch용 maskImage가 걸려 있어 box-shadow가 잘려 거의 보이지 않는다.
    <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-[430px] -translate-x-1/2 shadow-[0_-4px_16px_-6px_rgb(20_20_43/0.12)]">
      <nav
        aria-label="주요 메뉴"
        className="relative rounded-t-card bg-white pb-[env(safe-area-inset-bottom)]"
        style={{
          maskImage: NOTCH_MASK,
          WebkitMaskImage: NOTCH_MASK,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        <ul className={`flex items-center justify-between px-8 ${NAV_BAR_HEIGHT}`}>
          {TAB_ITEMS.slice(0, 2).map(({ to, label, Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                aria-label={label}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                {({ isActive }) => (
                  <span
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-center ${
                      isActive ? 'text-brand-blue' : 'text-brand-blue/35'
                    }`}
                  >
                    <Icon aria-hidden="true" size={26} strokeWidth={isActive ? 2.5 : 1.75} />
                  </span>
                )}
              </NavLink>
            </li>
          ))}

          <li aria-hidden="true" className="w-16" />

          {TAB_ITEMS.slice(2).map(({ to, label, Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                aria-label={label}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                {({ isActive }) => (
                  <span
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-center ${
                      isActive ? 'text-brand-blue' : 'text-brand-blue/35'
                    }`}
                  >
                    <Icon aria-hidden="true" size={26} strokeWidth={isActive ? 2.5 : 1.75} />
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Link
        to={ROUTE_PATHS.courseCreate}
        aria-label="새 여행 코스 만들기"
        className="absolute left-1/2 top-0 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-lime shadow-fab transition-transform duration-150 active:scale-95 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <Plus aria-hidden="true" size={32} strokeWidth={3} className="text-brand-blue" />
      </Link>
    </div>
  )
}

export default BottomNavigation
