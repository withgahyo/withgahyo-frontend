import { apiClient } from './client'

export function resolveApiAssetUrl(url: string): string
export function resolveApiAssetUrl(url: null): null
export function resolveApiAssetUrl(url: string | null) {
  if (!url || !url.startsWith('/')) {
    return url
  }

  const baseURL = apiClient.defaults.baseURL

  if (!baseURL) {
    return url
  }

  return new URL(url, baseURL).toString()
}
