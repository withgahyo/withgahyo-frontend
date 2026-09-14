import type { ReactNode } from 'react'
import brandLogo from '../../assets/splash/splash-logo-lime.svg'
import vectorDecoration from '../../assets/splash/Vector.svg'

interface BrandLoadingScreenProps {
  message: string
  /** 스크린리더 안내 문구. 생략하면 message를 사용한다. */
  srMessage?: string
  /** 좌측 상단 로고 노출 여부 (기본값: false) */
  showLogo?: boolean
  /** message 아래에 보여줄 보조 설명(예: 현재 진행 단계). 없으면 표시하지 않는다. */
  description?: string | null
  /** 0~100. null/undefined면 진행률 바 없이 기존 pulse 애니메이션만 노출한다. */
  progress?: number | null
  /** progress 아래에 보여줄 추가 콘텐츠(예: 추천 팁 캐러셀). 없으면 표시하지 않는다. */
  children?: ReactNode
}

// 브랜드 블루 풀블리드 로딩 화면. 중앙 심볼에 미세한 pulse만 적용한다.
// Splash/온보딩 완료 화면과 동일하게 AppContainer의 Safe Area padding을 -mt/-mb로
// 상쇄해 배경이 노치/홈 인디케이터까지 이어지도록 하고, 콘텐츠는 안쪽 wrapper에서
// 다시 Safe Area 안으로 배치한다.
function BrandLoadingScreen({
  message,
  srMessage,
  showLogo = false,
  description,
  progress,
  children,
}: BrandLoadingScreenProps) {
  const hasProgress = typeof progress === 'number' && Number.isFinite(progress)
  const clampedProgress = hasProgress ? Math.min(100, Math.max(0, progress)) : 0
  return (
    <div className="min-h-app relative -mb-[env(safe-area-inset-bottom)] -mt-[env(safe-area-inset-top)] h-[calc(100%+env(safe-area-inset-top)+env(safe-area-inset-bottom))] overflow-hidden bg-brand-blue">
      <span role="status" aria-live="polite" className="sr-only">
        {srMessage ?? message}
      </span>

      <div className="absolute inset-x-0 bottom-[env(safe-area-inset-bottom)] top-[env(safe-area-inset-top)]">
        {showLogo && (
          <img src={brandLogo} alt="같이가효" className="absolute left-6 top-8 w-[22%] max-w-19" />
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <img
            src={brandLogo}
            alt=""
            aria-hidden="true"
            className="w-16 animate-pulse motion-reduce:animate-none"
          />
          <p className="text-base font-semibold text-brand-lime">{message}</p>

          {description && (
            <p className="max-w-[80%] text-center text-xs text-white/70">{description}</p>
          )}

          {hasProgress && (
            <div className="mt-1 w-48 max-w-[70%]">
              <div
                role="progressbar"
                aria-valuenow={Math.round(clampedProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={message}
                className="h-1.5 w-full overflow-hidden rounded-full bg-white/20"
              >
                <div
                  className="h-full rounded-full bg-brand-lime transition-[width] duration-300 ease-out"
                  style={{ width: `${clampedProgress}%` }}
                />
              </div>
              <p className="mt-1.5 text-center text-xs font-medium text-brand-lime">
                {Math.round(clampedProgress)}%
              </p>
            </div>
          )}

          {children}
        </div>

        <img
          src={vectorDecoration}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 -right-8 w-[130%] max-w-none"
        />
      </div>
    </div>
  )
}

export default BrandLoadingScreen
