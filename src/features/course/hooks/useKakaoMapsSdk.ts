import { useEffect, useState } from 'react'

export type KakaoMapsSdkStatus = 'loading' | 'ready' | 'error'

const SDK_SCRIPT_ID = 'kakao-maps-sdk'
const KAKAO_MAP_APP_KEY = import.meta.env.VITE_KAKAO_MAP_APP_KEY

// 모듈 스코프 싱글톤 — StrictMode의 이중 마운트나 여러 컴포넌트에서 동시에 호출해도
// <script> 는 한 번만 주입되고 같은 Promise 를 공유한다.
let sdkPromise: Promise<void> | null = null

function loadKakaoMapsSdk(): Promise<void> {
  if (sdkPromise) return sdkPromise

  sdkPromise = new Promise<void>((resolve, reject) => {
    if (window.kakao?.maps) {
      resolve()
      return
    }

    if (!KAKAO_MAP_APP_KEY) {
      reject(
        new Error(
          'VITE_KAKAO_MAP_APP_KEY 환경변수가 없습니다. .env 파일에 Kakao Maps JavaScript 키를 추가하세요. (.env.example 참고)',
        ),
      )
      return
    }

    const existingScript = document.getElementById(SDK_SCRIPT_ID) as HTMLScriptElement | null

    const handleReady = () => {
      // autoload=false 로 로드했으므로 명시적으로 maps 모듈을 초기화한다.
      window.kakao.maps.load(() => resolve())
    }

    if (existingScript) {
      handleReady()
      return
    }

    const script = document.createElement('script')
    script.id = SDK_SCRIPT_ID
    script.async = true
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false`
    script.addEventListener('load', handleReady)
    script.addEventListener('error', () => {
      reject(
        new Error(
          'Kakao Maps SDK 로드에 실패했습니다. Kakao Developers 콘솔에서 (1) 해당 앱의 "카카오맵" 서비스 활성화, (2) 플랫폼 > Web 사이트 도메인 등록(예: http://localhost:5173), (3) JavaScript 키 사용 여부를 확인하세요.',
        ),
      )
    })
    document.head.appendChild(script)
  })

  // 실패 시 다음 시도에서 다시 로드할 수 있도록 캐시를 비운다.
  sdkPromise.catch(() => {
    sdkPromise = null
  })

  return sdkPromise
}

export function useKakaoMapsSdk() {
  // 이미 SDK가 있으면 'ready', 아니면 'loading'으로 시작한다.
  // (effect 안에서 동기적으로 상태를 바꾸지 않도록 초기값에서 분기한다.)
  const [status, setStatus] = useState<KakaoMapsSdkStatus>(() =>
    typeof window !== 'undefined' && window.kakao?.maps ? 'ready' : 'loading',
  )
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    loadKakaoMapsSdk()
      .then(() => {
        if (cancelled) return
        setStatus('ready')
        setError(null)
      })
      .catch((cause: unknown) => {
        if (cancelled) return
        setStatus('error')
        setError(cause instanceof Error ? cause : new Error('알 수 없는 오류가 발생했습니다.'))
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { status, error }
}
