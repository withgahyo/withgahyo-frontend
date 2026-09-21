import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../constants/queryKeys'
import { getUpcomingWeather } from '../../../api/weather'
import { toWeatherView } from '../mappers/toWeatherView'

export function useUpcomingWeather() {
  return useQuery({
    queryKey: queryKeys.weatherUpcoming,
    queryFn: async () => toWeatherView(await getUpcomingWeather()),
  })
}
