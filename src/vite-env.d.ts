/// <reference types="vite/client" />
/// <reference types="kakaomaps" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_KAKAO_MAP_APP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  kakao: typeof kakao
}
