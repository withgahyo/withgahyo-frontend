import DailyForecastCard from './DailyForecastCard'
import type { DailyForecastView } from '../types'

interface DailyForecastSectionProps {
  forecasts: DailyForecastView[]
  showPartialNotice: boolean
}

function DailyForecastSection({ forecasts, showPartialNotice }: DailyForecastSectionProps) {
  return (
    <section>
      <h2 className="text-sm font-bold text-ink">일별 날씨</h2>

      {showPartialNotice && (
        <p className="mt-2 whitespace-pre-line rounded-xl bg-brand-blue/5 px-3 py-2 text-xs leading-5 text-brand-blue">
          {'아직 예보가 제공되지 않는 여행 날짜가 있어요.\n여행일이 가까워지면 다시 확인해주세요.'}
        </p>
      )}

      {/* 1일 여행은 카드 하나가 화면 너비를 꽉 채우고, 2일 이상은 2열로 배치한다.
          grid는 카드 개수가 늘어도(여행 기간이 길어도) 자동으로 다음 줄로 넘어가 레이아웃이 깨지지 않는다. */}
      <div className={`mt-4 grid gap-3 ${forecasts.length <= 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {forecasts.map((forecast) => (
          <DailyForecastCard key={forecast.date} forecast={forecast} />
        ))}
      </div>
    </section>
  )
}

export default DailyForecastSection
