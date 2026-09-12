import { ArrowLeft, Camera, Save } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/common/PrimaryButton'
import { getStoredAuthUser } from '../../features/auth/utils/tokenStorage'
import {
  useProfileImageUploadMutation,
  useUserProfileMutation,
} from '../../features/mypage/hooks/useUserProfileMutation'
import { ROUTE_PATHS } from '../../routes/routePaths'

function ProfileEditPage() {
  const navigate = useNavigate()
  const authUser = getStoredAuthUser()
  const updateProfileMutation = useUserProfileMutation()
  const uploadProfileImageMutation = useProfileImageUploadMutation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(authUser?.nickname ?? '')
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
  const [selectedProfileImageFile, setSelectedProfileImageFile] = useState<File | null>(null)

  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl)
      }
    }
  }, [previewImageUrl])

  const normalizedName = name.trim()
  const profileImageSrc = previewImageUrl ?? authUser?.profileImageUrl ?? ''
  const isNameValid = normalizedName.length >= 2 && normalizedName.length <= 20
  const hasChanged = useMemo(
    () => normalizedName !== (authUser?.nickname ?? '') || selectedProfileImageFile !== null,
    [authUser?.nickname, normalizedName, selectedProfileImageFile],
  )
  const isPending = updateProfileMutation.isPending || uploadProfileImageMutation.isPending
  const canSubmit = isNameValid && hasChanged && !isPending
  const hasError = updateProfileMutation.isError || uploadProfileImageMutation.isError

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const nextPreviewImageUrl = URL.createObjectURL(file)
    setPreviewImageUrl((currentPreviewImageUrl) => {
      if (currentPreviewImageUrl) {
        URL.revokeObjectURL(currentPreviewImageUrl)
      }
      return nextPreviewImageUrl
    })
    setSelectedProfileImageFile(file)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return

    try {
      if (normalizedName !== (authUser?.nickname ?? '')) {
        await updateProfileMutation.mutateAsync({
          nickname: normalizedName,
        })
      }

      if (selectedProfileImageFile) {
        await uploadProfileImageMutation.mutateAsync(selectedProfileImageFile)
      }

      navigate(ROUTE_PATHS.mypage, { replace: true })
    } catch {
      // Mutation state renders the user-facing error message.
    }
  }

  return (
    <main className="flex min-h-app flex-col bg-surface-muted">
      <header className="flex items-center gap-3 bg-white px-5 py-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors active:bg-ink/5"
          aria-label="뒤로 가기"
        >
          <ArrowLeft size={22} aria-hidden="true" />
        </button>
        <h1 className="text-lg font-extrabold text-ink">개인정보 관리</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col px-6 py-7">
        <div className="flex flex-col items-center">
          <div className="relative h-24 w-24">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-brand-lime text-3xl font-extrabold text-brand-blue">
              {profileImageSrc ? (
                <img
                  src={profileImageSrc}
                  alt="프로필 미리보기"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Camera size={32} aria-hidden="true" />
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleProfileImageChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-brand-blue text-white shadow-[0_8px_18px_rgba(51,65,255,0.24)]"
              aria-label="프로필 이미지 선택"
            >
              <Camera size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-ink/65">이름</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={20}
              className="h-13 w-full rounded-2xl border border-ink/10 bg-white px-4 text-base font-semibold text-ink outline-none transition-colors placeholder:text-ink/25 focus:border-brand-blue"
              placeholder="이름을 입력해주세요"
            />
            <span className={`mt-2 block text-xs ${isNameValid ? 'text-ink/40' : 'text-red-500'}`}>
              이름은 2자 이상 20자 이하로 입력해주세요.
            </span>
          </label>

          <div>
            <span className="mb-2 block text-sm font-bold text-ink/65">이메일</span>
            <p className="flex min-h-13 items-center rounded-2xl border border-ink/10 bg-white px-4 text-base font-semibold text-ink/55">
              {authUser?.email ?? '이메일 정보 없음'}
            </p>
          </div>

          {previewImageUrl && (
            <p className="text-sm font-semibold text-ink/45">
              선택한 사진은 미리보기로 확인할 수 있어요.
            </p>
          )}

          {hasError && (
            <p className="text-sm font-semibold text-red-500">
              프로필 수정에 실패했어요. 잠시 후 다시 시도해 주세요.
            </p>
          )}
        </div>

        <div className="mt-auto pt-8">
          <PrimaryButton type="submit" disabled={!canSubmit}>
            <span className="inline-flex items-center justify-center gap-2">
              <Save size={18} aria-hidden="true" />
              {isPending ? '저장 중...' : '저장하기'}
            </span>
          </PrimaryButton>
        </div>
      </form>
    </main>
  )
}

export default ProfileEditPage
