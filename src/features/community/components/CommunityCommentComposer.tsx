import { Send } from 'lucide-react'

interface CommunityCommentComposerProps {
  value: string
  isPending: boolean
  onChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function CommunityCommentComposer({
  value,
  isPending,
  onChange,
  onSubmit,
}: CommunityCommentComposerProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-10 flex h-13 w-[calc(100%-2.5rem)] max-w-[390px] -translate-x-1/2 items-center rounded-full bg-white px-4 shadow-[0_10px_24px_rgb(0_0_0/0.16)]"
    >
      <label className="sr-only" htmlFor="community-comment">
        댓글 입력
      </label>
      <input
        id="community-comment"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-[#b8bbc7]"
        placeholder="커뮤니티에 댓글을 입력하세요."
      />
      <button
        type="submit"
        aria-label="댓글 작성"
        disabled={!value.trim() || isPending}
        className="ml-2 flex h-9 w-9 items-center justify-center rounded-full text-brand-blue disabled:text-brand-blue/35"
      >
        <Send size={25} fill="currentColor" strokeWidth={1.8} />
      </button>
    </form>
  )
}

export default CommunityCommentComposer
