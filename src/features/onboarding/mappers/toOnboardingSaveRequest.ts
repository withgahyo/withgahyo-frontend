import type { OnboardingSaveRequest } from '../api/types'

interface OnboardingSelectionState {
  tourismPreferenceIds: number[]
  foodPreferenceIds: number[]
  walkingTimeId: string | null
  restNeedId: string | null
  stairsToleranceId: string | null
  mealCautionId: string | null
}

/**
 * Zustand의 온보딩 선택 상태를 백엔드 온보딩 저장 요청 DTO로 변환한다.
 *
 * - 컨디션 값은 화면 label이 아니라 옵션 id 문자열을 그대로 전송한다(백엔드 스펙 확정).
 * - slopePreference는 대응하는 프론트 입력이 없으므로 항상 null을 보낸다.
 * - facilityIds / burdensomeFoodIds는 백엔드 저장 스펙이 없어 요청에 포함하지 않는다.
 */
export function toOnboardingSaveRequest(
  state: OnboardingSelectionState,
): OnboardingSaveRequest {
  return {
    walkingTolerance: state.walkingTimeId,
    restPreference: state.restNeedId,
    stairsPreference: state.stairsToleranceId,
    slopePreference: null,
    spicyPreference: state.mealCautionId,
    tourismPreferenceIds: state.tourismPreferenceIds,
    foodPreferenceIds: state.foodPreferenceIds,
  }
}
