import type { RecommendedCourse } from '../types'

// UI 검증용 mock 데이터 (추천 코스 3안 시각 검증 목적, 서버 DTO 아님)
// TODO: AI 추천 코스 API 연동 시 React Query로 교체
export const MOCK_RECOMMENDED_COURSES: RecommendedCourse[] = [
  {
    id: 'rec-1',
    title: '부모님 편안함 우선 코스',
    satisfaction: 80,
    tags: ['무장애', '자연', '휴식', '전통 시장'],
    totalDistanceKm: 12.4,
    totalDurationMinutes: 34,
  },
  {
    id: 'rec-2',
    title: '우리 가족 취향 집합 코스',
    satisfaction: 67,
    tags: ['핫플', '체험 활동', '명소', '휴식'],
    totalDistanceKm: 15.7,
    totalDurationMinutes: 39,
  },
  {
    id: 'rec-3',
    title: '자연이 아름다운 힐링 코스',
    satisfaction: 60,
    tags: ['자연', '힐링', '명소', '휴식'],
    totalDistanceKm: 20.1,
    totalDurationMinutes: 45,
  },
]

// 페이지 간 상태 전달이 없는 직접 URL 접근 시 사용하는 코스 이름 fallback
export const MOCK_COURSE_NAME_FALLBACK = '대전 가족여행'
