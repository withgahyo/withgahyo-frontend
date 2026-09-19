import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../constants/queryKeys'
import { getHome } from '../../../api/home'
import { toFamilyCourses } from '../mappers/toFamilyCourse'
import { sortFamilyCoursesForHome } from '../utils/sortFamilyCourses'

export function useHomeFamilyCourses() {
  return useQuery({
    queryKey: queryKeys.home,
    queryFn: async () => toFamilyCourses(sortFamilyCoursesForHome((await getHome()).familyCourses)),
  })
}
