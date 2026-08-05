import { Outlet } from 'react-router-dom'
import AppContainer from '../components/layout/AppContainer'

function RootLayout() {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
  )
}

export default RootLayout
