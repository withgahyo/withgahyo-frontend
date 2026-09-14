// AI 코스 생성 플로우(생성 중 → 추천 후보 → 후보 상세)에 속하는 경로인지 판단한다.
// router.tsx 의 courseGenerating / courseRecommendations / courseCandidateDetail 과 동일한 패턴이어야 한다.
const FLOW_PATH_PATTERNS = [
  /^\/courses\/([^/]+)\/generating\/([^/]+)$/,
  /^\/courses\/([^/]+)\/recommendations\/([^/]+)$/,
  /^\/courses\/([^/]+)\/recommendations\/([^/]+)\/candidates\/[^/]+$/,
]

interface GenerationFlowLocation {
  courseId: string
  generationId: string
}

function matchGenerationFlow(pathname: string): GenerationFlowLocation | null {
  for (const pattern of FLOW_PATH_PATTERNS) {
    const match = pathname.match(pattern)
    if (match) return { courseId: match[1], generationId: match[2] }
  }
  return null
}

// 두 경로가 "같은 courseId + generationId" 를 다루는 생성 플로우 내부 이동인지 확인한다.
// (예: recommendations/123 ↔ recommendations/123/candidates/31)
export function isSameGenerationFlow(fromPathname: string, toPathname: string): boolean {
  const from = matchGenerationFlow(fromPathname)
  const to = matchGenerationFlow(toPathname)
  if (!from || !to) return false
  return from.courseId === to.courseId && from.generationId === to.generationId
}
