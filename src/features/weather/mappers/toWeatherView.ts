import type { DailyForecastResponse, UpcomingWeatherResponse } from '../../../api/weather'
import { formatDDay } from '../../../utils/dDay.ts'
import { parseLocalDate, WEEKDAY_LABELS } from '../../../utils/localDate.ts'
import { getWeatherTips } from '../utils/getWeatherTips.ts'
import type { DailyForecastView, TripSummary, WeatherView } from '../types'

function formatMonthDay(dateString: string): string {
  const date = parseLocalDate(dateString)
  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}

function formatShortDate(dateString: string): string {
  const date = parseLocalDate(dateString)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

function formatWeekday(dateString: string): string {
  return WEEKDAY_LABELS[parseLocalDate(dateString).getDay()]
}

function formatDateRangeLabel(startDate: string, endDate: string): string {
  if (startDate === endDate) return formatMonthDay(startDate)
  return `${formatMonthDay(startDate)} ~ ${formatMonthDay(endDate)}`
}

function toTripSummary(response: UpcomingWeatherResponse): TripSummary | null {
  if (
    response.courseTitle === null ||
    response.regionName === null ||
    response.startDate === null ||
    response.endDate === null ||
    response.daysUntilTrip === null
  ) {
    return null
  }

  return {
    courseTitle: response.courseTitle,
    regionName: response.regionName,
    dateRangeLabel: formatDateRangeLabel(response.startDate, response.endDate),
    dDay: formatDDay(response.daysUntilTrip),
  }
}

function toDailyForecastView(forecast: DailyForecastResponse): DailyForecastView {
  return {
    date: forecast.date,
    dateLabel: formatShortDate(forecast.date),
    weekdayLabel: formatWeekday(forecast.date),
    condition: forecast.weatherCondition,
    maxTemperature: forecast.maxTemperature,
    minTemperature: forecast.minTemperature,
    precipitationProbability: forecast.precipitationProbability,
  }
}

export function toWeatherView(response: UpcomingWeatherResponse): WeatherView {
  const dailyForecasts = response.dailyForecasts.map(toDailyForecastView)

  return {
    status: response.status,
    trip: toTripSummary(response),
    dailyForecasts,
    tips: getWeatherTips(dailyForecasts),
  }
}
