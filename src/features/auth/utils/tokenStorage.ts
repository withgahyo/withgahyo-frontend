export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

const ACCESS_TOKEN_KEY = 'withgahyo.accessToken'
const REFRESH_TOKEN_KEY = 'withgahyo.refreshToken'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getAccessToken() {
  if (!canUseStorage()) {
    return null
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  if (!canUseStorage()) {
    return null
  }

  return window.localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function getStoredAuthTokens(): AuthTokens | null {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()

  if (!accessToken || !refreshToken) {
    return null
  }

  return { accessToken, refreshToken }
}

export function setAuthTokens(tokens: AuthTokens) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
  window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
}

export function clearAuthTokens() {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}
