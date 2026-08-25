import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getStoredAuthTokens } from '../features/auth/utils/tokenStorage'
import { ROUTE_PATHS } from './routePaths'

function AuthGuard() {
  const location = useLocation()
  const hasStoredTokens = Boolean(getStoredAuthTokens())

  if (!hasStoredTokens) {
    const redirect = `${location.pathname}${location.search}`

    return (
      <Navigate
        to={`${ROUTE_PATHS.login}?redirect=${encodeURIComponent(redirect)}`}
        replace
      />
    )
  }

  return <Outlet />
}

export default AuthGuard
