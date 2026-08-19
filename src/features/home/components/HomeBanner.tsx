import { ImageIcon } from 'lucide-react'

// TODO: 배너 API 연동 시 실제 이미지/문구로 교체
function HomeBanner() {
  return (
    <div className="flex aspect-343/80 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white/10 text-white/60">
      <ImageIcon aria-hidden="true" size={20} />
      <span className="text-sm font-medium">배너 영역</span>
    </div>
  )
}

export default HomeBanner
