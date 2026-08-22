export type OAuthProvider = 'kakao' | 'google'

const OAUTH_AUTHORIZE_URLS: Record<OAuthProvider, string> = {
  kakao: 'https://kauth.kakao.com/oauth/authorize',
  google: 'https://accounts.google.com/o/oauth2/v2/auth',
}

const OAUTH_CLIENT_IDS: Record<OAuthProvider, string | undefined> = {
  kakao: import.meta.env.VITE_KAKAO_CLIENT_ID,
  google: import.meta.env.VITE_GOOGLE_CLIENT_ID,
}

const OAUTH_SCOPES: Record<OAuthProvider, string | undefined> = {
  kakao: undefined,
  google: 'openid email profile',
}

const OAUTH_EXTRA_PARAMS: Record<OAuthProvider, Record<string, string>> = {
  kakao: {},
  google: {
    prompt: 'select_account',
  },
}

export function getOAuthRedirectUri(provider: OAuthProvider) {
  return `${window.location.origin}/oauth/${provider}/callback`
}

export function buildOAuthAuthorizeUrl(provider: OAuthProvider) {
  const clientId = OAUTH_CLIENT_IDS[provider]

  if (!clientId) {
    throw new Error(`${provider} OAuth client id가 설정되지 않았습니다.`)
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getOAuthRedirectUri(provider),
    response_type: 'code',
  })
  const scope = OAUTH_SCOPES[provider]
  const extraParams = OAUTH_EXTRA_PARAMS[provider]

  if (scope) {
    params.set('scope', scope)
  }

  Object.entries(extraParams).forEach(([key, value]) => {
    params.set(key, value)
  })

  return `${OAUTH_AUTHORIZE_URLS[provider]}?${params.toString()}`
}
