import { useMemo, useState } from 'react'
import { Bell, ChevronLeft, Heart, MoreVertical, Send, Star } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'
import {
  COMMUNITY_CATEGORY_LABELS,
  COMMUNITY_THUMBNAILS,
  MOCK_COMMUNITY_COMMENTS,
  MOCK_COMMUNITY_DETAIL,
} from '../../features/community/mock'
import {
  useCommunityComments,
  useCommunityPostDetail,
  useCreateCommunityComment,
} from '../../features/community/hooks/useCommunityQueries'
import type {
  CommunityCommentResponse,
} from '../../api/community'

function CommunityDetailPage() {
  const navigate = useNavigate()
  const { postId } = useParams()
  const parsedPostId = Number(postId)
  const safePostId = Number.isFinite(parsedPostId) ? parsedPostId : null
  const detailQuery = useCommunityPostDetail(safePostId)
  const commentsQuery = useCommunityComments(safePostId)
  const createComment = useCreateCommunityComment(safePostId)
  const [comment, setComment] = useState('')

  const post = detailQuery.data ?? MOCK_COMMUNITY_DETAIL
  const comments = commentsQuery.data?.comments.length
    ? commentsQuery.data.comments
    : MOCK_COMMUNITY_COMMENTS
  const thumbnail = useMemo(
    () => COMMUNITY_THUMBNAILS[post.postId % COMMUNITY_THUMBNAILS.length],
    [post.postId],
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const content = comment.trim()
    if (!content || safePostId == null) return

    await createComment.mutateAsync({ content })
    setComment('')
  }

  return (
    <div className="relative -mt-[env(safe-area-inset-top)] flex min-h-app flex-col overflow-hidden bg-brand-blue pt-[env(safe-area-inset-top)] text-white">
      <DetailBackgroundLoop />
      <header className="relative z-1 flex h-16 items-center justify-between px-5">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
          className="rounded-full p-1 text-white"
        >
          <ChevronLeft size={28} strokeWidth={2.4} />
        </button>
        <h1 className="text-lg font-extrabold">{categoryLabel(post.category)}</h1>
        <div className="flex items-center gap-3 text-white">
          <Link to={ROUTE_PATHS.notifications} aria-label="알림" className="rounded-full p-1">
            <Bell size={19} strokeWidth={2.1} />
          </Link>
          <button type="button" aria-label="더보기" className="rounded-full p-1">
            <MoreVertical size={21} strokeWidth={2.6} />
          </button>
        </div>
      </header>

      <main className="relative z-1 flex-1 overflow-y-auto px-5 pb-28">
        <article className="rounded-xl bg-[#071ed8] p-4 shadow-[0_10px_24px_rgb(0_0_0/0.18)]">
          <div className="flex items-start gap-3">
            <img src={thumbnail} alt="" className="h-12 w-12 rounded-md object-cover" />
            <div>
              <p className="text-sm font-extrabold">{post.authorNickname}</p>
              <p className="mt-0.5 text-[10px] font-semibold text-white/62">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          {post.category === 'REVIEW' && (
            <div className="mt-4 flex gap-1 text-brand-lime" aria-label="별점 5점">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={19} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
          )}

          <h2 className="mt-3 text-xl font-black leading-tight">{post.title}</h2>
          <p className="mt-3 whitespace-pre-line text-[13px] font-medium leading-relaxed text-white/92">
            {post.content}
          </p>
          <div className="mt-6 border-t border-white/10 pt-2 text-[10px] text-white/40">
            ♥ {post.likeCount}
          </div>
        </article>

        <div className="mt-4 space-y-3">
          {comments.map((item) => (
            <CommentCard key={item.commentId} comment={item} thumbnail={thumbnail} />
          ))}
        </div>
      </main>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-10 flex h-13 w-[calc(100%-2.5rem)] max-w-[390px] -translate-x-1/2 items-center rounded-full bg-white px-4 shadow-[0_10px_24px_rgb(0_0_0/0.16)]"
      >
        <label className="sr-only" htmlFor="community-comment">
          댓글 입력
        </label>
        <input
          id="community-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-[#b8bbc7]"
          placeholder="커뮤니티에 댓글을 입력하세요."
        />
        <button
          type="submit"
          aria-label="댓글 작성"
          disabled={!comment.trim() || createComment.isPending}
          className="ml-2 flex h-9 w-9 items-center justify-center rounded-full text-brand-blue disabled:text-brand-blue/35"
        >
          <Send size={25} fill="currentColor" strokeWidth={1.8} />
        </button>
      </form>
    </div>
  )
}

function CommentCard({
  comment,
  thumbnail,
}: {
  comment: CommunityCommentResponse
  thumbnail: string
}) {
  return (
    <article className="rounded-xl bg-[#071ed8] p-3 shadow-[0_8px_18px_rgb(0_0_0/0.14)]">
      <div className="flex items-start gap-3">
        <img src={thumbnail} alt="" className="h-10 w-10 rounded-md object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-extrabold">{comment.authorNickname}</p>
            <Heart size={15} className="text-brand-lime" />
          </div>
          <p className="mt-1 text-[11px] font-medium text-white/84">{comment.content}</p>
        </div>
      </div>
    </article>
  )
}

function DetailBackgroundLoop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-16 right-[-4.5rem] h-52 w-80 rounded-[55%] border-[18px] border-[#1f31e9] opacity-70"
    />
  )
}

function categoryLabel(category: string) {
  return COMMUNITY_CATEGORY_LABELS[category] ?? category
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export default CommunityDetailPage
