import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getWeatherConditionIcon,
  getWeatherConditionLabel,
  WEATHER_CONDITION_FALLBACK_ICON,
} from '../src/features/weather/constants/weatherIcons.ts'
import { Sun, Cloudy, CloudRain, CloudSnow, CloudHail } from 'lucide-react'

test('maps each backend WeatherCondition enum value to the intended lucide icon', () => {
  assert.equal(getWeatherConditionIcon('SUNNY'), Sun)
  assert.equal(getWeatherConditionIcon('CLOUDY'), Cloudy)
  assert.equal(getWeatherConditionIcon('RAIN'), CloudRain)
  assert.equal(getWeatherConditionIcon('SNOW'), CloudSnow)
  assert.equal(getWeatherConditionIcon('RAIN_SNOW'), CloudHail)
})

test('falls back to a neutral icon when the backend could not resolve a condition (null)', () => {
  assert.equal(getWeatherConditionIcon(null), WEATHER_CONDITION_FALLBACK_ICON)
})

test('every condition has a non-empty accessible label distinct from the fallback', () => {
  const conditions = ['SUNNY', 'CLOUDY', 'RAIN', 'SNOW', 'RAIN_SNOW']
  for (const condition of conditions) {
    const label = getWeatherConditionLabel(condition)
    assert.ok(label.length > 0)
  }
})
