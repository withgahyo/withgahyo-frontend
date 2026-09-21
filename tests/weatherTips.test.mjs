import test from 'node:test'
import assert from 'node:assert/strict'
import { getWeatherTips } from '../src/features/weather/utils/getWeatherTips.ts'
import { TIP_THRESHOLDS, MAX_TIP_COUNT } from '../src/features/weather/constants/tipThresholds.ts'

function day(overrides = {}) {
  return {
    condition: null,
    maxTemperature: null,
    minTemperature: null,
    precipitationProbability: null,
    ...overrides,
  }
}

test('RAIN condition produces the umbrella tip', () => {
  const tips = getWeatherTips([day({ condition: 'RAIN' })])
  assert.deepEqual(tips, ['비가 올 수 있어요. 작은 우산을 챙겨주세요.'])
})

test('RAIN_SNOW condition also produces the umbrella tip (grouped with RAIN)', () => {
  const tips = getWeatherTips([day({ condition: 'RAIN_SNOW' })])
  assert.deepEqual(tips, ['비가 올 수 있어요. 작은 우산을 챙겨주세요.'])
})

test('SNOW condition produces the non-slip shoes tip', () => {
  const tips = getWeatherTips([day({ condition: 'SNOW' })])
  assert.deepEqual(tips, ['눈 예보가 있어요. 미끄럽지 않은 신발을 준비해주세요.'])
})

test('high precipitation probability without rain/snow condition produces an umbrella tip', () => {
  const tips = getWeatherTips([
    day({ precipitationProbability: TIP_THRESHOLDS.highPrecipitationProbability }),
  ])
  assert.deepEqual(tips, ['비 올 확률이 높아요. 우산을 챙기면 좋아요.'])
})

test('high precipitation probability tip is suppressed when a RAIN day already produced an umbrella tip (no duplicate)', () => {
  const tips = getWeatherTips([
    day({ condition: 'RAIN' }),
    day({ precipitationProbability: 95 }),
  ])
  assert.deepEqual(tips, ['비가 올 수 있어요. 작은 우산을 챙겨주세요.'])
})

test('hot max temperature at or above threshold produces the heat tip', () => {
  const tips = getWeatherTips([day({ maxTemperature: TIP_THRESHOLDS.hotMaxTemperature })])
  assert.deepEqual(tips, ['낮에는 더울 수 있어요. 가벼운 옷과 물을 준비해주세요.'])
})

test('cold min temperature at or below threshold produces the cold tip', () => {
  const tips = getWeatherTips([day({ minTemperature: TIP_THRESHOLDS.coldMinTemperature })])
  assert.deepEqual(tips, ['아침저녁으로 쌀쌀할 수 있어요. 겉옷을 챙겨주세요.'])
})

test('temperatures just inside the threshold do not trigger a tip', () => {
  const tips = getWeatherTips([
    day({
      maxTemperature: TIP_THRESHOLDS.hotMaxTemperature - 1,
      minTemperature: TIP_THRESHOLDS.coldMinTemperature + 1,
    }),
  ])
  assert.deepEqual(tips, [])
})

test('never returns more than MAX_TIP_COUNT tips even when every condition overlaps', () => {
  const tips = getWeatherTips([
    day({
      condition: 'RAIN',
      maxTemperature: TIP_THRESHOLDS.hotMaxTemperature,
      minTemperature: TIP_THRESHOLDS.coldMinTemperature,
    }),
    day({ condition: 'SNOW' }),
  ])
  assert.equal(tips.length, MAX_TIP_COUNT)
  assert.deepEqual(tips, [
    '비가 올 수 있어요. 작은 우산을 챙겨주세요.',
    '눈 예보가 있어요. 미끄럽지 않은 신발을 준비해주세요.',
  ])
})

test('no conditions across any day produces no tips', () => {
  assert.deepEqual(getWeatherTips([day(), day()]), [])
})

test('empty forecast list produces no tips (out-of-range/no-trip statuses)', () => {
  assert.deepEqual(getWeatherTips([]), [])
})
