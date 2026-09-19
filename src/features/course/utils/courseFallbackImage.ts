import courseFallback1 from '../../../assets/course-fallback/course-fallback-1.png'
import courseFallback2 from '../../../assets/course-fallback/course-fallback-2.png'
import courseFallback3 from '../../../assets/course-fallback/course-fallback-3.png'

// 후보 카드 대표 이미지가 없을 때 쓰는 fallback. 후보마다 다른 이미지가 보이도록
// rank(1-base) 기준으로 순환 배정한다. rank가 3을 넘어도 modulo로 안전하게 순환한다.
export const COURSE_FALLBACK_IMAGES = [courseFallback1, courseFallback2, courseFallback3]

export function getCourseFallbackImage(rank: number): string {
  const index = ((rank - 1) % COURSE_FALLBACK_IMAGES.length + COURSE_FALLBACK_IMAGES.length) %
    COURSE_FALLBACK_IMAGES.length
  return COURSE_FALLBACK_IMAGES[index]
}
