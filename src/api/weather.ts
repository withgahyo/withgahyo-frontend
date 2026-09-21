import { unwrapApiResponse } from './auth'
import { apiClient } from './client'
import type { ApiResponse } from '../types/api'

type BackendApiResponse<T> =
  | ApiResponse<T>
  | {
      success: boolean
      code: string
      message: string
      data: T
    }

export type WeatherStatus =
  | 'AVAILABLE'
  | 'PARTIALLY_AVAILABLE'
  | 'OUT_OF_FORECAST_RANGE'
  | 'NO_UPCOMING_TRIP'
  | 'LOCATION_UNAVAILABLE'
  | 'EXTERNAL_API_ERROR'

export type WeatherCondition = 'SUNNY' | 'CLOUDY' | 'RAIN' | 'SNOW' | 'RAIN_SNOW'

export interface DailyForecastResponse {
  date: string
  weatherCondition: WeatherCondition | null
  minTemperature: number | null
  maxTemperature: number | null
  precipitationProbability: number | null
}

export interface UpcomingWeatherResponse {
  status: WeatherStatus
  courseId: number | null
  courseTitle: string | null
  regionName: string | null
  startDate: string | null
  endDate: string | null
  daysUntilTrip: number | null
  dailyForecasts: DailyForecastResponse[]
}

export async function getUpcomingWeather() {
  const response = await apiClient.get<BackendApiResponse<UpcomingWeatherResponse>>(
    '/api/v1/weather/upcoming',
  )

  return unwrapApiResponse(response.data)
}
