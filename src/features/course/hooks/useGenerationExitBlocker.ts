import { useCallback, useRef } from 'react'
import { useBlocker } from 'react-router-dom'
import { isSameGenerationFlow } from '../utils/generationFlowPath'

/**
 * AI 코스 생성/추천 플로우 화면(생성 중, 추천 후보, 후보 상세)에서 공통으로 쓰는 이탈 방지 blocker.
 *
 * - active 가 true 인 동안에만 이탈을 막는다.
 * - 같은 courseId + generationId 를 다루는 플로우 내부 이동(예: 추천 후보 ↔ 후보 상세)은 막지 않는다.
 * - allowNextNavigation() 을 호출한 직후의 navigate() 한 번은 무조건 통과시킨다.
 *   (mutation onSuccess 안에서 navigate 하는 경우, active 가 그 시점까지 state 로 갱신되지
 *   않았을 수 있어 ref 로 즉시 우회한다.)
 */
export function useGenerationExitBlocker(active: boolean) {
  const allowNextRef = useRef(false)

  const shouldBlock = useCallback(
    ({
      currentLocation,
      nextLocation,
    }: {
      currentLocation: { pathname: string }
      nextLocation: { pathname: string }
    }) => {
      if (allowNextRef.current) {
        allowNextRef.current = false
        return false
      }
      if (!active) return false
      if (isSameGenerationFlow(currentLocation.pathname, nextLocation.pathname)) return false
      return true
    },
    [active],
  )

  const blocker = useBlocker(shouldBlock)

  const allowNextNavigation = useCallback(() => {
    allowNextRef.current = true
  }, [])

  return { blocker, allowNextNavigation }
}
