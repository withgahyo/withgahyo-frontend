import { useEffect } from 'react'

// 새로고침/탭 닫기 시 브라우저 기본 확인창을 띄운다.
// 브라우저 정책상 커스텀 문구는 노출할 수 없으므로 이벤트를 취소하는 것으로 충분하다.
export function useBeforeUnloadWarning(active: boolean) {
  useEffect(() => {
    if (!active) return

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [active])
}
