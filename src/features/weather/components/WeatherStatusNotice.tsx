import PrimaryButton from '../../../components/common/PrimaryButton'

interface WeatherStatusNoticeProps {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

// NO_UPCOMING_TRIP / OUT_OF_FORECAST_RANGE / LOCATION_UNAVAILABLE / EXTERNAL_API_ERROR가
// 공유하는 "안내 문구 + (선택) 액션 버튼" 레이아웃을 하나로 묶은 공통 컴포넌트.
function WeatherStatusNotice({ title, description, actionLabel, onAction }: WeatherStatusNoticeProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-16 text-center">
      <p className="text-base font-semibold text-ink">{title}</p>
      {description && (
        <p className="whitespace-pre-line text-caption text-ink/50">{description}</p>
      )}
      {actionLabel && onAction && (
        <div className="mt-4 w-full max-w-56">
          <PrimaryButton onClick={onAction}>{actionLabel}</PrimaryButton>
        </div>
      )}
    </div>
  )
}

export default WeatherStatusNotice
