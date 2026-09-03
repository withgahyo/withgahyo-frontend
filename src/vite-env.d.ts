/// <reference types="vite/client" />
/// <reference types="kakaomaps" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_KAKAO_MAP_APP_KEY: string
  /** 'true'면 코스 상세 화면을 mock으로 렌더 (백엔드 연동 전 임시). */
  readonly VITE_USE_COURSE_MOCK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  kakao: typeof kakao
}
