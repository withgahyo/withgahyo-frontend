import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CommunityActionMenu from '../../features/community/components/CommunityActionMenu'
import CommunityBackgroundLoop from '../../features/community/components/CommunityBackgroundLoop'
import CommunityCommentCard from '../../features/community/components/CommunityCommentCard'
import CommunityCommentComposer from '../../features/community/components/CommunityCommentComposer'
import CommunityDetailHeader from '../../features/community/components/CommunityDetailHeader'
import CommunityPostArticle from '../../features/community/components/CommunityPostArticle'
import {
  useBlockCommunityUser,
  useCommunityComments,
  useCommunityPostDetail,
  useCommunityPostShareUrl,
  useCreateCommunityComment,
  useReportCommunityPost,
} from '../../features/community/hooks/useCommunityQueries'
import {
  COMMUNITY_THUMBNAILS,
  MOCK_COMMUNITY_COMMENTS,
  MOCK_COMMUNITY_DETAIL,
} from '../../features/community/mock'
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

  async function handleReport() {
    if (safePostId == null) return
    await reportPost.mutateAsync({
      reason: 'INAPPROPRIATE',
      description: '사용자가 커뮤니티 상세 화면에서 신고했습니다.',
    })
    closeActionMenuWithMessage('게시글을 신고했어요.')
  }

  async function handleBlock() {
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
        title={getCommunityCategoryLabel(post.category)}
        onBack={() => navigate(-1)}
        onOpenMenu={() => setIsActionMenuOpen(true)}
      />

      <main className="relative z-1 flex-1 overflow-y-auto px-5 pb-28">
        {actionMessage && (
          <div className="mb-3 rounded-full bg-white/15 px-4 py-2 text-center text-xs font-bold text-white">
            {actionMessage}
          </div>
        )}
        <CommunityPostArticle post={post} thumbnail={thumbnail} />

        <div className="mt-4 space-y-3">
          {comments.map((item) => (
            <CommunityCommentCard key={item.commentId} comment={item} thumbnail={thumbnail} />
          ))}
        </div>
      </main>

      <CommunityCommentComposer
        value={comment}
        isPending={createComment.isPending}
        onChange={setComment}
        onSubmit={handleSubmit}
      />

      {isActionMenuOpen && (
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
