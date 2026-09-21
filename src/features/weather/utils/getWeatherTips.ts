import { MAX_TIP_COUNT, TIP_THRESHOLDS } from '../constants/tipThresholds.ts'
import type { DailyForecastView } from '../types'

type TipCandidate = Pick<
  DailyForecastView,
  'condition' | 'maxTemperature' | 'minTemperature' | 'precipitationProbability'
>

const RAIN_TIP = '비가 올 수 있어요. 작은 우산을 챙겨주세요.'
const SNOW_TIP = '눈 예보가 있어요. 미끄럽지 않은 신발을 준비해주세요.'
const UMBRELLA_TIP = '비 올 확률이 높아요. 우산을 챙기면 좋아요.'
const HOT_TIP = '낮에는 더울 수 있어요. 가벼운 옷과 물을 준비해주세요.'
const COLD_TIP = '아침저녁으로 쌀쌀할 수 있어요. 겉옷을 챙겨주세요.'

/**
 * 여행 기간의 일별 예보에서 deterministic한 준비 TIP을 뽑는다. LLM을 사용하지 않으며,
 * 조건이 여러 개 겹쳐도 가장 중요한 순서(강수/적설 > 강수확률 > 기온)로 최대 MAX_TIP_COUNT개만 반환한다.
 */
export function getWeatherTips(dailyForecasts: TipCandidate[]): string[] {
  const hasRainOrRainSnow = dailyForecasts.some(
    (day) => day.condition === 'RAIN' || day.condition === 'RAIN_SNOW',
  )
  const hasSnow = dailyForecasts.some((day) => day.condition === 'SNOW')
  const hasHighPrecipitationProbability = dailyForecasts.some(
    (day) =>
      day.precipitationProbability !== null &&
      day.precipitationProbability >= TIP_THRESHOLDS.highPrecipitationProbability,
  )
  const hasHotDay = dailyForecasts.some(
    (day) => day.maxTemperature !== null && day.maxTemperature >= TIP_THRESHOLDS.hotMaxTemperature,
  )
  const hasColdDay = dailyForecasts.some(
    (day) => day.minTemperature !== null && day.minTemperature <= TIP_THRESHOLDS.coldMinTemperature,
  )

  const tips: string[] = []
  if (hasRainOrRainSnow) tips.push(RAIN_TIP)
  if (hasSnow) tips.push(SNOW_TIP)
  // 이미 비/눈 TIP으로 우산을 안내했다면 같은 내용을 중복 노출하지 않는다.
  if (hasHighPrecipitationProbability && !hasRainOrRainSnow) tips.push(UMBRELLA_TIP)
  if (hasHotDay) tips.push(HOT_TIP)
  if (hasColdDay) tips.push(COLD_TIP)

  return tips.slice(0, MAX_TIP_COUNT)
}
