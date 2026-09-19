import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../routes/routePaths'
import { getCourseFallbackImage } from '../utils/courseFallbackImage'
import type { CourseCandidateSummary } from '../types'

interface RecommendedCourseCardProps {
  candidate: CourseCandidateSummary
  /** 후보 순위(1-base). fallback 이미지를 후보마다 다르게 배정하는 기준. */
  rank: number
  courseId: string
  generationId: string
  onSelect: (candidateId: number) => void
  /** 이 후보를 선택(확정) 요청 중 */
  isSelecting: boolean
  /** 다른 후보를 선택 요청 중이라 이 카드의 버튼도 잠금 */
  disabled: boolean
}

function RecommendedCourseCard({
  candidate,
  rank,
  courseId,
  generationId,
  onSelect,
  isSelecting,
  disabled,
}: RecommendedCourseCardProps) {
  const navigate = useNavigate()
  const { candidateId, title, summary, matchScore, tags, thumbnailImageUrl } = candidate
  const isLocked = disabled || isSelecting

  // 실제 썸네일 로딩이 실패해도(네트워크 오류 등) fallback으로 바꾼다.
  // fallback(로컬 정적 asset) 자체는 실패할 일이 없으므로 무한 onError 루프는 발생하지 않는다.
  const [thumbnailFailed, setThumbnailFailed] = useState(false)
  const fallbackImage = getCourseFallbackImage(rank)
  const displayImageSrc =
    thumbnailImageUrl && !thumbnailFailed ? thumbnailImageUrl : fallbackImage

  return (
    <article className="rounded-card border border-gray-100 bg-white p-4 shadow-[0_2px_16px_-8px_rgba(20,20,43,0.15)]">
      <div className="flex gap-3">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-200">
          <img
            src={displayImageSrc}
            alt={`${title} 대표 이미지`}
            className="h-full w-full object-cover"
            onError={() => setThumbnailFailed(true)}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h3 className="text-base font-bold text-ink">{title}</h3>

          <p className="text-caption font-semibold text-brand-blue">
            매칭 점수 {Math.round(matchScore)}
          </p>

          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-brand-lime px-2 py-0.5 text-[11px] font-semibold text-ink"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <p className="pt-1 text-caption text-gray-400">{summary}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() =>
            navigate(
              ROUTE_PATHS.courseCandidateDetail(courseId, generationId, String(candidateId)),
            )
          }
          className="flex-1 whitespace-nowrap rounded-full border border-gray-300 px-1 py-2 text-xs font-semibold text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          자세히 보기
        </button>

        <button
          type="button"
          onClick={() => onSelect(candidateId)}
          disabled={isLocked}
          aria-disabled={isLocked}
          className={`flex-1 whitespace-nowrap rounded-full px-1 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
            isLocked
              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
              : 'bg-brand-blue text-brand-lime'
          }`}
        >
          {isSelecting ? '확정 중...' : '이 코스로 확정'}
        </button>
      </div>
    </article>
  )
}

export default RecommendedCourseCard
