import splashLogo from '../../../assets/splash/splash-logo-blue.svg'
import illustrationBlue from '../../../assets/splash/splash-illustration-blue.png'
import illustrationLime from '../../../assets/splash/splash-illustration-lime.png'
import kakaoIcon from '../../../assets/icons/kakao.webp'
import googleIcon from '../../../assets/icons/google.webp'

export type AuthLandingStage = 'initial' | 'logoIn' | 'illustrationCrossfade' | 'buttonsIn'

const STAGE_ORDER: AuthLandingStage[] = ['initial', 'logoIn', 'illustrationCrossfade', 'buttonsIn']

interface AuthLandingSceneProps {
  stage: AuthLandingStage
}

function hasReached(stage: AuthLandingStage, target: AuthLandingStage) {
  return STAGE_ORDER.indexOf(stage) >= STAGE_ORDER.indexOf(target)
}

function AuthLandingScene({ stage }: AuthLandingSceneProps) {
  const isLogoVisible = hasReached(stage, 'logoIn')
  const isIllustrationCrossfaded = hasReached(stage, 'illustrationCrossfade')
  const areButtonsVisible = hasReached(stage, 'buttonsIn')

  return (
    // 배경을 AppContainer의 Safe Area padding 밖(화면 끝)까지 확장해 노치/홈 인디케이터
    // 영역까지 브랜드 컬러가 이어지도록 하고, 아래 안쪽 래퍼에서 실제 콘텐츠를 다시
    // Safe Area 안쪽으로 배치한다. AppContainer 자체의 Safe Area 정책은 변경하지 않는다.
    <div className="min-h-app relative -mt-[env(safe-area-inset-top)] -mb-[env(safe-area-inset-bottom)] h-[calc(100%+env(safe-area-inset-top)+env(safe-area-inset-bottom))] overflow-hidden bg-brand-lime">
      <div className="absolute inset-x-0 top-[env(safe-area-inset-top)] bottom-[env(safe-area-inset-bottom)]">
        <img
          src={splashLogo}
          alt="같이가효"
          className={`absolute left-1/2 top-[23%] w-[30%] -translate-x-1/2 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
            isLogoVisible
              ? 'translate-y-0 scale-100 opacity-100'
              : 'translate-y-3 scale-95 opacity-0'
          }`}
        />

        <div className="absolute bottom-0 left-[-4%] w-[82%]">
          <img
            src={illustrationBlue}
            alt=""
            className={`block w-full transition-opacity duration-700 ease-out motion-reduce:transition-none ${
              isIllustrationCrossfaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <img
            src={illustrationLime}
            alt=""
            className={`absolute inset-0 block w-full transition-opacity duration-700 ease-out motion-reduce:transition-none ${
              isIllustrationCrossfaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div className="absolute inset-x-0 bottom-10 z-10 flex flex-col gap-3 px-6">
          <button
            type="button"
            className={`flex items-center justify-center gap-2 rounded-full bg-[#FEE500] py-4 text-base font-semibold text-[#181600] transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              areButtonsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <img src={kakaoIcon} alt="" className="h-6 w-6" />
            카카오톡으로 시작하기
          </button>

          <button
            type="button"
            className={`flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white py-4 text-base font-semibold text-ink transition-all delay-100 duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              areButtonsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <img src={googleIcon} alt="" className="h-6 w-6" />
            구글 계정으로 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthLandingScene
