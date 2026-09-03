import { getCourseDetail } from '../../../api/course'
import { toCourseDetail } from '../mappers/toCourseDetail'
import { MOCK_COURSE_DETAIL_RESPONSES } from '../mocks/courseDetail'
import type { CourseDetail } from '../types'

// 백엔드/AI 서버 연결 전까지 mock 응답으로 코스 상세 화면을 렌더한다.
// .env 의 VITE_USE_COURSE_MOCK 값이 'true' 일 때만 mock을 사용하고, 그 외에는 실제 API를 호출한다.
// 연동이 끝나면 이 플래그와 mocks/courseDetail.ts 를 제거한다.
const USE_COURSE_MOCK = import.meta.env.VITE_USE_COURSE_MOCK === 'true'

export async function getCourseDetailView(courseIdParam: string): Promise<CourseDetail> {
  if (USE_COURSE_MOCK) {
    const mock = MOCK_COURSE_DETAIL_RESPONSES[courseIdParam]
    if (!mock) {
      throw new Error(`[mock] 코스를 찾을 수 없습니다: ${courseIdParam}`)
    }
    // 실제 API 응답과 동일하게 매퍼를 거쳐 화면 뷰모델로 변환한다.
    return toCourseDetail(mock)
  }

  const numericId = Number(courseIdParam)
  if (!Number.isFinite(numericId)) {
    throw new Error(`유효하지 않은 courseId: ${courseIdParam}`)
  }
  return toCourseDetail(await getCourseDetail(numericId))
}
