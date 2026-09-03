import { useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../constants/queryKeys'
import { markOnboardingCompleted } from '../../auth/utils/tokenStorage'
import {
  completeOnboarding,
  getFoodPreferenceOptions,
  getTourismPreferenceOptions,
  saveOnboarding,
} from '../api/onboardingApi'
import type { OnboardingSaveRequest } from '../api/types'

export function useTourismPreferenceOptions() {
  return useQuery({
    queryKey: queryKeys.onboardingTourismOptions,
    queryFn: getTourismPreferenceOptions,
  })
}

export function useFoodPreferenceOptions() {
  return useQuery({
    queryKey: queryKeys.onboardingFoodOptions,
    queryFn: getFoodPreferenceOptions,
  })
}

/**
 * 온보딩 최종 저장: PUT 저장 성공 후 POST 완료를 순차 호출한다.
 * 둘 중 하나라도 실패하면 mutation 전체가 실패로 처리되고, 아래 auth 동기화는 실행되지 않는다.
 */
export function useSaveOnboardingMutation() {
  return useMutation({
    mutationFn: async (request: OnboardingSaveRequest) => {
      await saveOnboarding(request)
      await completeOnboarding()
      // PUT + complete 가 모두 성공한 뒤에만 프론트 auth 상태를 서버 완료 상태와 맞춘다.
      markOnboardingCompleted()
    },
  })
}
