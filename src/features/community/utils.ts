import { COMMUNITY_CATEGORY_LABELS } from './mock'

export function getCommunityCategoryLabel(category: string) {
  return COMMUNITY_CATEGORY_LABELS[category] ?? category
}

export function formatCommunityCount(count: number) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }

  return count.toString()
}

export function formatCommunityDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export async function copyToClipboard(value: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}
