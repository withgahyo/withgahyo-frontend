import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../constants/queryKeys'
import { createCourse, getCourseDetail } from '../../../api/course'
import {
  createCourseGeneration,
  getCourseCandidateDetail,
  getCourseCandidates,
  getCourseGeneration,
  selectCourseCandidate,
} from '../../../api/courseGeneration'
import { COURSE_GENERATION_POLL_INTERVAL_MS, COURSE_GENERATION_STATUS } from '../constants'
import { toCandidateDetailView } from '../mappers/toCandidateDetailView'
import { toCourseDetail } from '../mappers/toCourseDetail'

export function isGenerationCompleted(status: string | undefined) {
  return status === COURSE_GENERATION_STATUS.completed
}

export function isGenerationFailed(status: string | undefined) {
  return status === COURSE_GENERATION_STATUS.failed
}

export function isGenerationTerminal(status: string | undefined) {
  return isGenerationCompleted(status) || isGenerationFailed(status)
}

export function useCreateCourse() {
  return useMutation({ mutationFn: createCourse })
}

export function useCreateCourseGeneration() {
  return useMutation({
    mutationFn: (courseId: number) => createCourseGeneration(courseId),
  })
}

/**
 * Generation 상태 polling.
 * - COMPLETED / FAILED (또는 failureCode 존재) 이면 refetchInterval 이 false 를 반환해 멈춘다.
 * - 그 외 모든 status 는 "진행 중"으로 보고 계속 polling 한다.
 * - options.enabled=false 이면 (예: 화면 timeout) polling 을 완전히 멈춘다.
 * - 컴포넌트 unmount 시 React Query 가 interval 을 자동 정리한다.
 */
export function useCourseGeneration(
  generationId: number | null,
  options?: { enabled?: boolean },
) {
  const enabled = (options?.enabled ?? true) && generationId != null

  return useQuery({
    queryKey: queryKeys.courseGeneration(generationId ?? 0),
    queryFn: () => getCourseGeneration(generationId as number),
    enabled,
    refetchInterval: (query) => {
      if (!enabled) return false
      const data = query.state.data
      if (isGenerationTerminal(data?.status) || data?.failureCode != null) return false
      return COURSE_GENERATION_POLL_INTERVAL_MS
    },
    refetchIntervalInBackground: false,
    // 항상 최신 상태가 필요하므로 캐시를 신선하게 두지 않는다.
    staleTime: 0,
    gcTime: 0,
  })
}

export function useCourseCandidates(generationId: number | null) {
  return useQuery({
    queryKey: queryKeys.courseCandidates(generationId ?? 0),
    queryFn: () => getCourseCandidates(generationId as number),
    enabled: generationId != null,
  })
}

export function useCourseCandidateDetail(
  generationId: number | null,
  candidateId: number | null,
) {
  return useQuery({
    queryKey: queryKeys.courseCandidate(generationId ?? 0, candidateId ?? 0),
    queryFn: async () =>
      toCandidateDetailView(
        await getCourseCandidateDetail(generationId as number, candidateId as number),
      ),
    enabled: generationId != null && candidateId != null,
  })
}

export function useSelectCourseCandidate(generationId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (candidateId: number) =>
      selectCourseCandidate(generationId as number, candidateId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.course(data.courseId) })
      if (generationId != null) {
        queryClient.invalidateQueries({ queryKey: queryKeys.courseCandidates(generationId) })
      }
    },
  })
}

export function useCourseDetail(courseId: number | null) {
  return useQuery({
    queryKey: queryKeys.course(courseId ?? 0),
    queryFn: async () => toCourseDetail(await getCourseDetail(courseId as number)),
    enabled: courseId != null,
  })
}
