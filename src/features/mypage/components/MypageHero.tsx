import vectorDecoration from '../../../assets/splash/Vector.svg'
import { PROFILE } from '../constants'
import type { AuthUser } from '../../auth/utils/tokenStorage'

interface MypageHeroProps {
  user: AuthUser | null
}

// Home/CourseCreateHeader와 동일한 "블루 Hero + Vector 스퀴글 장식" 패턴.
// 장식은 콘텐츠(z-10)보다 뒤(absolute)에 두고 스크린리더에서 제외한다.
function MypageHero({ user }: MypageHeroProps) {
  const nickname = user?.nickname || PROFILE.name
  const profileImageUrl = user?.profileImageUrl
  const email = user?.email || PROFILE.emptyEmail
  const avatarInitial = nickname.trim().charAt(0) || '가'

  return (
    <header className="relative overflow-hidden bg-brand-blue px-6 pb-12 pt-6">
      <img
        src={vectorDecoration}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-12 w-[120%] max-w-none"
      />

      <div className="relative z-10">
        <h1 className="text-heading font-bold text-white">마이페이지</h1>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-lime text-2xl font-extrabold text-brand-blue">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={`${nickname} 프로필 이미지`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span aria-hidden="true">{avatarInitial}</span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-extrabold leading-tight text-white">{nickname}</p>
            <p className="mt-1 truncate text-sm font-medium leading-tight text-white/70">{email}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default MypageHero
