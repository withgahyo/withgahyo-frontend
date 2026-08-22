import { Camera } from 'lucide-react'
import MypageCard from './MypageCard'
import { PROFILE } from '../constants'

function ProfileCard() {
  return (
    <MypageCard className="relative overflow-hidden p-5">
      <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-brand-lime/55" />
      <div className="absolute right-10 top-16 h-10 w-10 rounded-full bg-brand-blue/10" />

      <div className="relative flex items-center gap-4">
        <div className="relative flex h-18 w-18 shrink-0 items-center justify-center rounded-3xl bg-brand-lime text-3xl shadow-[0_12px_24px_-16px_rgb(20_20_43/0.55)]">
          <span aria-hidden="true">가</span>
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue text-white">
            <Camera aria-hidden="true" size={15} strokeWidth={2.5} />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <span className="inline-flex rounded-full bg-brand-blue/8 px-3 py-1 text-xs font-bold text-brand-blue">
            {PROFILE.badge}
          </span>
          <h2 className="mt-2 truncate text-xl font-extrabold text-ink">{PROFILE.name}</h2>
          <p className="mt-1 text-sm font-semibold text-ink/45">{PROFILE.handle}</p>
        </div>
      </div>
    </MypageCard>
  )
}

export default ProfileCard
