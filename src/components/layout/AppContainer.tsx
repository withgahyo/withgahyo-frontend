import type { ReactNode } from 'react'

interface AppContainerProps {
  children?: ReactNode
}

function AppContainer({ children }: AppContainerProps) {
  return (
    <div
      className="min-h-app relative mx-auto w-full max-w-[430px] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
    >
      {children}
    </div>
  )
}

export default AppContainer
