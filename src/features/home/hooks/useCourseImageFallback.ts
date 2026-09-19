import { useState } from 'react'
import { getCommonFallbackImage, getRegionFallbackImage } from '../utils/courseFallbackImage'

// 이미지 로딩 단계: 실제 이미지 → 지역 대표 이미지 → 공통 fallback 순으로 내려간다.
// 각 단계는 실패 시 한 번만 다음 단계로 전환하고, 공통 fallback(로컬 정적 asset)은
// 실패할 일이 없다고 보고 더 이상 전환하지 않아 무한 onError 루프가 생기지 않는다.
type ImageStage = 'primary' | 'region'

/**
 * FamilyCourseCard/AlternativeCandidateItem이 공유하는 대표 이미지 fallback 로직.
 * seed(courseId/candidateId 등)로 같은 대상이 항상 같은 공통 fallback 이미지를 갖게 한다.
 */
export function useCourseImageFallback(primaryUrl: string | null, region: string, seed: number) {
  const [failedStage, setFailedStage] = useState<ImageStage | null>(null)

  const regionImage = getRegionFallbackImage(region)
  const commonImage = getCommonFallbackImage(seed)

  const usePrimary = Boolean(primaryUrl) && failedStage !== 'primary'
  const useRegion = !usePrimary && Boolean(regionImage) && failedStage !== 'region'

  const src = usePrimary ? primaryUrl! : useRegion ? regionImage! : commonImage

  const onError = () => {
    if (usePrimary) {
      setFailedStage('primary')
    } else if (useRegion) {
      setFailedStage('region')
    }
  }

  return { src, onError }
}
