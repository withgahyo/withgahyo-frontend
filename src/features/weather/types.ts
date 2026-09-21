import type { WeatherCondition, WeatherStatus } from '../../api/weather'

export interface TripSummary {
  courseTitle: string
  regionName: string
  dateRangeLabel: string
  dDay: string
}

export interface DailyForecastView {
  date: string
  dateLabel: string
  weekdayLabel: string
  condition: WeatherCondition | null
  maxTemperature: number | null
  minTemperature: number | null
  precipitationProbability: number | null
}

export interface WeatherView {
  status: WeatherStatus
  trip: TripSummary | null
  dailyForecasts: DailyForecastView[]
  tips: string[]
}
