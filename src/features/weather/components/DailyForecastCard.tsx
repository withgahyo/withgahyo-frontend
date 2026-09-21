import {
  WEATHER_CONDITION_FALLBACK_ICON,
  WEATHER_CONDITION_FALLBACK_LABEL,
  WEATHER_CONDITION_ICONS,
  WEATHER_CONDITION_LABELS,
} from '../constants/weatherIcons'
import { parseLocalDate } from '../../../utils/localDate'
import type { DailyForecastView } from '../types'

interface DailyForecastCardProps {
  forecast: DailyForecastView
}

function formatFullDate(dateString: string): string {
  const date = parseLocalDate(dateString)
  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}

function DailyForecastCard({ forecast }: DailyForecastCardProps) {
  const Icon =
    forecast.condition === null
      ? WEATHER_CONDITION_FALLBACK_ICON
      : WEATHER_CONDITION_ICONS[forecast.condition]
  const conditionLabel =
    forecast.condition === null
      ? WEATHER_CONDITION_FALLBACK_LABEL
      : WEATHER_CONDITION_LABELS[forecast.condition]

  return (
    <div className="flex flex-col items-center gap-3 rounded-card bg-white px-4 py-6 text-center shadow-[0_2px_10px_-4px_rgb(20_20_43/0.12)]">
      <div className="flex w-full items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink/70">
          {formatFullDate(forecast.date)} ({forecast.weekdayLabel})
        </p>
        <p className="text-sm font-semibold text-brand-blue">{conditionLabel}</p>
      </div>

      <Icon aria-hidden="true" size={64} strokeWidth={1.5} className="my-1 text-brand-blue" />

      <div>
        <p className="text-4xl font-extrabold leading-none text-ink">
          {forecast.maxTemperature ?? '-'}°
        </p>
        <p className="mt-1.5 text-sm font-medium text-ink/45">
          최저 {forecast.minTemperature ?? '-'}°
        </p>
      </div>

      <p className="text-xs font-medium text-brand-blue/70">
        강수확률 {forecast.precipitationProbability ?? '-'}%
      </p>
    </div>
  )
}

export default DailyForecastCard
