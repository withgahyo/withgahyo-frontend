import test from 'node:test'
import assert from 'node:assert/strict'
import { toWeatherView } from '../src/features/weather/mappers/toWeatherView.ts'
import { ROUTE_PATHS } from '../src/routes/routePaths.ts'

function baseResponse(overrides = {}) {
  return {
    status: 'AVAILABLE',
    courseId: 1,
    courseTitle: '대전 가족 여행',
    regionName: '대전',
    startDate: '2026-09-25',
    endDate: '2026-09-27',
    daysUntilTrip: 4,
    dailyForecasts: [],
    ...overrides,
  }
}

test('AVAILABLE: maps trip summary with region/date-range/D-Day and courseTitle', () => {
  const view = toWeatherView(baseResponse())

  assert.deepEqual(view.trip, {
    courseTitle: '대전 가족 여행',
    regionName: '대전',
    dateRangeLabel: '9월 25일 ~ 9월 27일',
    dDay: 'D-4',
  })
})

test('single-day trip shows one date instead of a redundant range', () => {
  const view = toWeatherView(
    baseResponse({ startDate: '2026-09-25', endDate: '2026-09-25' }),
  )

  assert.equal(view.trip.dateRangeLabel, '9월 25일')
})

test('D-Day uses the same rule as Home (D-Day at zero, D+n for past)', () => {
  assert.equal(toWeatherView(baseResponse({ daysUntilTrip: 0 })).trip.dDay, 'D-Day')
  assert.equal(toWeatherView(baseResponse({ daysUntilTrip: -2 })).trip.dDay, 'D+2')
})

test('AVAILABLE: maps each dailyForecast date/weekday label without shifting a day', () => {
  const view = toWeatherView(
    baseResponse({
      dailyForecasts: [
        {
          date: '2026-09-25',
          weatherCondition: 'SUNNY',
          minTemperature: 18,
          maxTemperature: 27,
          precipitationProbability: 10,
        },
      ],
    }),
  )

  assert.deepEqual(view.dailyForecasts, [
    {
      date: '2026-09-25',
      dateLabel: '9/25',
      weekdayLabel: '금',
      condition: 'SUNNY',
      maxTemperature: 27,
      minTemperature: 18,
      precipitationProbability: 10,
    },
  ])
})

test('does not fabricate data for dates the backend did not send (only received days are mapped)', () => {
  const view = toWeatherView(
    baseResponse({
      status: 'PARTIALLY_AVAILABLE',
      dailyForecasts: [
        {
          date: '2026-09-25',
          weatherCondition: 'SUNNY',
          minTemperature: 18,
          maxTemperature: 27,
          precipitationProbability: 10,
        },
      ],
    }),
  )

  assert.equal(view.dailyForecasts.length, 1)
  assert.equal(view.status, 'PARTIALLY_AVAILABLE')
})

test('individually-null daily forecast fields (backend could not resolve them) pass through as null, not guessed', () => {
  const view = toWeatherView(
    baseResponse({
      dailyForecasts: [
        {
          date: '2026-09-25',
          weatherCondition: null,
          minTemperature: null,
          maxTemperature: 20,
          precipitationProbability: null,
        },
      ],
    }),
  )

  assert.equal(view.dailyForecasts[0].condition, null)
  assert.equal(view.dailyForecasts[0].minTemperature, null)
  assert.equal(view.dailyForecasts[0].precipitationProbability, null)
})

test('NO_UPCOMING_TRIP: trip is null and dailyForecasts is empty (no fabricated placeholder trip)', () => {
  const view = toWeatherView({
    status: 'NO_UPCOMING_TRIP',
    courseId: null,
    courseTitle: null,
    regionName: null,
    startDate: null,
    endDate: null,
    daysUntilTrip: null,
    dailyForecasts: [],
  })

  assert.equal(view.trip, null)
  assert.deepEqual(view.dailyForecasts, [])
  assert.deepEqual(view.tips, [])
})

test('OUT_OF_FORECAST_RANGE: trip info is still shown even though dailyForecasts is empty', () => {
  const view = toWeatherView(baseResponse({ status: 'OUT_OF_FORECAST_RANGE', dailyForecasts: [] }))

  assert.ok(view.trip)
  assert.equal(view.trip.regionName, '대전')
  assert.deepEqual(view.dailyForecasts, [])
})

test('LOCATION_UNAVAILABLE: trip info is still shown with empty dailyForecasts', () => {
  const view = toWeatherView(baseResponse({ status: 'LOCATION_UNAVAILABLE', dailyForecasts: [] }))

  assert.equal(view.status, 'LOCATION_UNAVAILABLE')
  assert.ok(view.trip)
  assert.deepEqual(view.dailyForecasts, [])
})

test('EXTERNAL_API_ERROR: trip info is still shown with empty dailyForecasts', () => {
  const view = toWeatherView(baseResponse({ status: 'EXTERNAL_API_ERROR', dailyForecasts: [] }))

  assert.equal(view.status, 'EXTERNAL_API_ERROR')
  assert.ok(view.trip)
  assert.deepEqual(view.dailyForecasts, [])
})

test('bottom navigation weather tab route matches the registered route path', () => {
  assert.equal(ROUTE_PATHS.weather, '/weather')
})
