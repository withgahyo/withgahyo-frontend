import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CommunityActionMenu from '../../features/community/components/CommunityActionMenu'
import CommunityBackgroundLoop from '../../features/community/components/CommunityBackgroundLoop'
import CommunityCommentCard from '../../features/community/components/CommunityCommentCard'
import CommunityCommentComposer from '../../features/community/components/CommunityCommentComposer'
import CommunityDetailHeader from '../../features/community/components/CommunityDetailHeader'
import CommunityPostArticle from '../../features/community/components/CommunityPostArticle'
import CommunityStateNotice from '../../features/community/components/CommunityStateNotice'
import {
  useBlockCommunityUser,
  useCommunityComments,
  useCommunityPostDetail,
  useCommunityPostShareUrl,
  useCreateCommunityComment,
  useReportCommunityPost,
} from '../../features/community/hooks/useCommunityQueries'
import { COMMUNITY_THUMBNAILS } from '../../features/community/mock'
import { copyToClipboard, getCommunityCategoryLabel } from '../../features/community/utils'

function CommunityDetailPage() {
  const navigate = useNavigate()
  const { postId } = useParams()
  const safePostId = toSafePostId(postId)
  const detailQuery = useCommunityPostDetail(safePostId)
  const commentsQuery = useCommunityComments(safePostId)
  const createComment = useCreateCommunityComment(safePostId)
  const reportPost = useReportCommunityPost(safePostId)
  const blockUser = useBlockCommunityUser()
  const shareUrl = useCommunityPostShareUrl(safePostId)
  const [comment, setComment] = useState('')
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  const post = detailQuery.data
  const comments = commentsQuery.data?.comments ?? []
  const thumbnail = useMemo(
    () =>
      COMMUNITY_THUMBNAILS[
        (post?.postId ?? safePostId ?? 0) % COMMUNITY_THUMBNAILS.length
      ],
    [post?.postId, safePostId],
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const content = comment.trim()
    if (!content || safePostId == null) return

    await createComment.mutateAsync({ content })
    setComment('')
  }

  async function handleReport() {
    if (safePostId == null) return
    await reportPost.mutateAsync({
      reason: 'INAPPROPRIATE',
      description: '사용자가 커뮤니티 상세 화면에서 신고했습니다.',
    })
    closeActionMenuWithMessage('게시글을 신고했어요.')
  }

  async function handleBlock() {
    if (!post) return
    await blockUser.mutateAsync(post.authorId)
    closeActionMenuWithMessage('작성자를 차단했어요.')
  }

  async function handleShare() {
    if (safePostId == null) return
    const response = await shareUrl.mutateAsync()
    await copyToClipboard(response.shareUrl)
    closeActionMenuWithMessage('URL을 복사했어요.')
  }

  function closeActionMenuWithMessage(message: string) {
    setActionMessage(message)
    setIsActionMenuOpen(false)
  }

  return (
    <div className="relative -mt-[env(safe-area-inset-top)] flex min-h-app flex-col overflow-hidden bg-brand-blue pt-[env(safe-area-inset-top)] text-white">
      <CommunityBackgroundLoop variant="detail" />
      <CommunityDetailHeader
        title={post ? getCommunityCategoryLabel(post.category) : '커뮤니티'}
        onBack={() => navigate(-1)}
        onOpenMenu={() => setIsActionMenuOpen(true)}
      />

      <main className="relative z-1 flex-1 overflow-y-auto px-5 pb-28">
        {actionMessage && (
          <div className="mb-3 rounded-full bg-white/15 px-4 py-2 text-center text-xs font-bold text-white">
            {actionMessage}
          </div>
        )}
        {detailQuery.isLoading && <CommunityStateNotice title="게시글을 불러오고 있어요." />}
        {(detailQuery.isError || (!detailQuery.isLoading && !post)) && (
          <CommunityStateNotice
            title="게시글을 불러오지 못했어요."
            description="삭제되었거나 접근할 수 없는 게시글일 수 있어요."
          />
        )}
        {post && (
          <>
            <CommunityPostArticle post={post} thumbnail={thumbnail} />

            <div className="mt-4 space-y-3">
              {commentsQuery.isLoading && <CommunityStateNotice title="댓글을 불러오고 있어요." />}
              {commentsQuery.isError && (
                <CommunityStateNotice
                  title="댓글을 불러오지 못했어요."
                  description="잠시 후 다시 시도해주세요."
                />
              )}
              {!commentsQuery.isLoading && !commentsQuery.isError && comments.length === 0 && (
                <CommunityStateNotice title="아직 댓글이 없어요." />
              )}
              {comments.map((item) => (
                <CommunityCommentCard
                  key={item.commentId}
                  comment={item}
                  thumbnail={thumbnail}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {post && (
        <CommunityCommentComposer
          value={comment}
          isPending={createComment.isPending}
          onChange={setComment}
          onSubmit={handleSubmit}
        />
      )}

      {post && isActionMenuOpen && (
        <CommunityActionMenu
          onClose={() => setIsActionMenuOpen(false)}
          onReport={handleReport}
          onBlock={handleBlock}
          onShare={handleShare}
          isPending={reportPost.isPending || blockUser.isPending || shareUrl.isPending}
        />
      )}
    </div>
  )
}

function toSafePostId(value: string | undefined) {
  const parsedPostId = Number(value)
  return Number.isFinite(parsedPostId) ? parsedPostId : null
}

export default CommunityDetailPage
