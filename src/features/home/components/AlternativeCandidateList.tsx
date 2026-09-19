import { useCourseImageFallback } from '../hooks/useCourseImageFallback'
import type { AlternativeCourse } from '../types'

interface AlternativeCandidateListProps {
  candidates: AlternativeCourse[]
  region: string
}

// 확정 코스 생성 당시 AI가 함께 추천했던, 선택되지 않은 후보들. 정보 표시용이며
// 확정 코스 상세로 이동하는 클릭 영역(FamilyCourseCard의 Link) 밖에 별도로 렌더링되어
// 클릭 시 부모 카드로 이벤트가 전파될 일이 없다. 클릭 불가 요소이므로 button/role을 쓰지 않는다.
function AlternativeCandidateList({ candidates, region }: AlternativeCandidateListProps) {
  if (candidates.length === 0) return null

  return (
    <div className="px-6 pt-4">
      <p className="pb-2 text-xs font-semibold text-white/70">AI가 함께 추천한 코스</p>
      <ul className="flex flex-col gap-2">
        {candidates.map((candidate) => (
          <AlternativeCandidateItem key={candidate.id} candidate={candidate} region={region} />
        ))}
      </ul>
    </div>
  )
}

interface AlternativeCandidateItemProps {
  candidate: AlternativeCourse
  region: string
}

function AlternativeCandidateItem({ candidate, region }: AlternativeCandidateItemProps) {
  const seed = Number(candidate.id) || 0
  const { src, onError } = useCourseImageFallback(candidate.imageUrl, region, seed)

  return (
    <li className="flex items-center gap-3 rounded-2xl bg-white/10 p-2.5">
      <img
        src={src}
        alt=""
        onError={onError}
        className="h-14 w-14 shrink-0 rounded-xl object-cover"
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="line-clamp-2 text-xs font-bold text-white">{candidate.title}</p>
        <p className="line-clamp-2 text-[11px] text-white/70">{candidate.summary}</p>
      </div>
    </li>
  )
}

export default AlternativeCandidateList
