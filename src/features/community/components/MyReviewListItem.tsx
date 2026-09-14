import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resolveApiAssetUrl } from '../../../api/assetUrl'
import type { MyReviewItemResponse } from '../../../api/review'
import courseDaejeon from '../../../assets/home/course-daejeon.jpeg'
import { ROUTE_PATHS } from '../../../routes/routePaths'

interface MyReviewListItemProps {
  review: MyReviewItemResponse
}

function MyReviewListItem({ review }: MyReviewListItemProps) {
  const imageUrl = resolveApiAssetUrl(review.course.imageUrl) ?? courseDaejeon
  const commentPreview = review.comment || '남긴 한줄 후기가 없어요.'

  return (
    <Link
      to={ROUTE_PATHS.courseDetail(String(review.course.courseId))}
      className="flex min-h-20 items-center rounded-xl bg-[#071ed8] p-2.5 shadow-[0_8px_18px_rgb(0_0_0/0.18)]"
    >
      <img src={imageUrl} alt="" className="h-14 w-14 shrink-0 rounded-md object-cover" />
      <div className="min-w-0 flex-1 px-3">
        <div className="flex items-center gap-1 text-brand-lime">
          <Star aria-hidden="true" size={13} fill="currentColor" strokeWidth={1.4} />
          <span className="text-[10px] font-black">{review.rating.toFixed(1)}</span>
        </div>
        <h3 className="mt-1 truncate text-[13px] font-extrabold text-white">
          {review.course.title}
        </h3>
        <p className="mt-1 truncate text-[9px] font-semibold text-white/60">{commentPreview}</p>
      </div>
    </Link>
  )
}

export default MyReviewListItem
