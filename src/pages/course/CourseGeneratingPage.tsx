import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BrandLoadingScreen from '../../components/common/BrandLoadingScreen'
import { ROUTE_PATHS } from '../../routes/routePaths'

// 실제 API 연동 전 UI 확인을 위한 임시 대기 시간
const MOCK_GENERATION_DELAY_MS = 1800

function CourseGeneratingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { generationId } = useParams<{ generationId: string }>()

  useEffect(() => {
    if (!generationId) return

    // TODO: AI 코스 생성 API 연동 후 응답 완료 시점에 추천 결과 페이지로 이동
    const timer = setTimeout(() => {
      navigate(ROUTE_PATHS.courseRecommendations(generationId), {
        replace: true,
        state: location.state,
      })
    }, MOCK_GENERATION_DELAY_MS)

    return () => clearTimeout(timer)
  }, [generationId, location.state, navigate])

  return (
    <BrandLoadingScreen message="AI 코스 생성 중..." srMessage="AI가 여행 코스를 만들고 있습니다" />
  )
}

export default CourseGeneratingPage
