import { CloudFog, CloudHail, CloudRain, CloudSnow, Cloudy, Sun, type LucideIcon } from 'lucide-react'
import type { WeatherCondition } from '../../../api/weather'

// Backend WeatherCondition(SUNNY/CLOUDY/RAIN/SNOW/RAIN_SNOW) 기준 매핑.
// 비/눈 혼합과 정확히 일치하는 아이콘이 lucide-react에 없어 가장 근접한 CloudHail을 사용한다.
export const WEATHER_CONDITION_ICONS: Record<WeatherCondition, LucideIcon> = {
  SUNNY: Sun,
  CLOUDY: Cloudy,
  RAIN: CloudRain,
  SNOW: CloudSnow,
  RAIN_SNOW: CloudHail,
}

// Backend가 그날의 조건을 판단하지 못해 null을 내려준 경우의 fallback.
export const WEATHER_CONDITION_FALLBACK_ICON: LucideIcon = CloudFog

export function getWeatherConditionIcon(condition: WeatherCondition | null): LucideIcon {
  if (condition === null) return WEATHER_CONDITION_FALLBACK_ICON
  return WEATHER_CONDITION_ICONS[condition]
}

// 아이콘만으로 상태를 구분하지 않기 위한(접근성) 스크린리더용 텍스트.
export const WEATHER_CONDITION_LABELS: Record<WeatherCondition, string> = {
  SUNNY: '맑음',
  CLOUDY: '흐림',
  RAIN: '비',
  SNOW: '눈',
  RAIN_SNOW: '비/눈',
}

export const WEATHER_CONDITION_FALLBACK_LABEL = '정보 없음'

export function getWeatherConditionLabel(condition: WeatherCondition | null): string {
  if (condition === null) return WEATHER_CONDITION_FALLBACK_LABEL
  return WEATHER_CONDITION_LABELS[condition]
}
