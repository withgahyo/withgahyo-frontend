import { useNavigate } from 'react-router-dom'
import DailyForecastSection from '../../features/weather/components/DailyForecastSection'
import TripSummaryHeader from '../../features/weather/components/TripSummaryHeader'
import WeatherStatusNotice from '../../features/weather/components/WeatherStatusNotice'
import WeatherTipList from '../../features/weather/components/WeatherTipList'
import { useUpcomingWeather } from '../../features/weather/hooks/useWeatherQueries'
import type { WeatherView } from '../../features/weather/types'
import { ROUTE_PATHS } from '../../routes/routePaths'

function WeatherPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useUpcomingWeather()

  return (
    <main className="relative -mt-[env(safe-area-inset-top)] flex min-h-app flex-col bg-brand-blue pt-[env(safe-area-inset-top)]">
      <TripSummaryHeader trip={data?.trip ?? null} />

      <div className="relative -mt-6 flex flex-1 flex-col rounded-t-card bg-surface-muted px-6 pb-[calc(4.5rem+2.5rem+env(safe-area-inset-bottom))] pt-8">
        {isLoading ? (
          <p className="flex flex-1 items-center justify-center text-caption text-gray-400">
            날씨 정보를 불러오는 중...
          </p>
        ) : isError || !data ? (
          // apiClient 요청 자체가 실패한 경우(네트워크 오류 등). Backend가 성공 응답으로 내려주는
          // EXTERNAL_API_ERROR 상태와는 별개로, TanStack Query의 refetch로 재시도할 수 있게 한다.
          <WeatherStatusNotice
            title="날씨 정보를 불러오지 못했어요."
            description={'잠시 후 다시 확인해주세요.'}
            actionLabel="다시 시도"
            onAction={() => refetch()}
          />
        ) : (
          <WeatherContent
            data={data}
            onCreateCourse={() => navigate(ROUTE_PATHS.courseCreate)}
            onRetry={() => refetch()}
          />
        )}
      </div>
    </main>
  )
}

interface WeatherContentProps {
  data: WeatherView
  onCreateCourse: () => void
  onRetry: () => void
}

function WeatherContent({ data, onCreateCourse, onRetry }: WeatherContentProps) {
  switch (data.status) {
    case 'NO_UPCOMING_TRIP':
      return (
        <WeatherStatusNotice
          title="예정된 여행이 없어요"
          description={'새로운 여행을 만들면\n여행지의 날씨를 확인할 수 있어요.'}
          actionLabel="여행 만들기"
          onAction={onCreateCourse}
        />
      )
    case 'LOCATION_UNAVAILABLE':
      return <WeatherStatusNotice title="이 여행의 날씨 정보를 확인할 수 없어요." />
    case 'OUT_OF_FORECAST_RANGE':
      return (
        <WeatherStatusNotice
          title="아직 날씨를 확인하기 어려워요"
          description={'여행일이 가까워지면 이곳에서\n여행지의 날씨를 확인할 수 있어요.'}
        />
      )
    case 'EXTERNAL_API_ERROR':
      return (
        <WeatherStatusNotice
          title="날씨 정보를 불러오지 못했어요."
          description={'잠시 후 다시 확인해주세요.'}
          actionLabel="다시 시도"
          onAction={onRetry}
        />
      )
    case 'AVAILABLE':
    case 'PARTIALLY_AVAILABLE':
      return (
        <>
          <DailyForecastSection
            forecasts={data.dailyForecasts}
            showPartialNotice={data.status === 'PARTIALLY_AVAILABLE'}
          />
          <WeatherTipList tips={data.tips} />
        </>
      )
  }
}

export default WeatherPage
