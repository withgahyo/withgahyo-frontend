export interface AuthTokens {
  accessToken: string
  refreshToken: string
  user?: AuthUser | null
}

export interface AuthUser {
  userId: number
  nickname: string
  profileImageUrl?: string | null
  email?: string | null
  onboardingCompleted?: boolean
}

const ACCESS_TOKEN_KEY = 'withgahyo.accessToken'
const REFRESH_TOKEN_KEY = 'withgahyo.refreshToken'
const AUTH_USER_KEY = 'withgahyo.authUser'

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

export function getStoredAuthUser(): AuthUser | null {
  if (!canUseStorage()) {
    return null
  }

  const storedUser = window.localStorage.getItem(AUTH_USER_KEY)

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as AuthUser
  } catch {
    window.localStorage.removeItem(AUTH_USER_KEY)
    return null
  }
}

export function setAuthTokens(tokens: AuthTokens) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
  window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)

  if (tokens.user) {
    setAuthUser(tokens.user)
  }
}

export function setAuthUser(user: AuthUser) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

export function clearAuthTokens() {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
  window.localStorage.removeItem(AUTH_USER_KEY)
}
