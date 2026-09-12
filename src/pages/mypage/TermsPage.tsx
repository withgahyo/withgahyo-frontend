import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TERMS_SECTIONS = [
  {
    title: '1. 서비스 이용',
    body: [
      '같이가효는 카카오 계정으로 간편하게 가입하고 이용할 수 있는 가족 여행 코스 추천 서비스입니다.',
      '회원은 카카오 로그인을 완료하고 서비스를 이용함으로써 본 약관에 동의한 것으로 봅니다.',
    ],
  },
  {
    title: '2. 카카오 로그인과 계정 정보',
    body: [
      '서비스 가입과 로그인에는 카카오 계정 연동이 사용됩니다.',
      '회사는 서비스 제공을 위해 카카오 계정에서 제공되는 기본 프로필 정보, 이메일, 식별값 등을 사용할 수 있습니다.',
      '회원은 개인정보 관리 화면에서 이름과 프로필 정보를 확인하거나 수정할 수 있습니다.',
    ],
  },
  {
    title: '3. 여행 취향 정보 활용',
    body: [
      '회원이 선택한 관광 취향, 식사 취향, 걷는 시간, 휴식 필요도, 계단·경사 부담, 식사 주의사항은 맞춤 코스 추천에 활용됩니다.',
      '가족 구성원을 연결한 경우, 함께 여행하는 사람의 취향과 이동 조건이 코스 추천에 반영될 수 있습니다.',
      '회원은 마이페이지에서 여행 취향 정보를 언제든지 다시 수정할 수 있습니다.',
    ],
  },
  {
    title: '4. 코스 및 장소 정보',
    body: [
      '서비스에서 제공하는 여행 코스, 장소, 이동 동선, 추천 사유는 사용자의 선택값과 외부 장소 정보를 바탕으로 생성되는 참고 정보입니다.',
      '실제 운영 시간, 휴무일, 입장료, 예약 가능 여부, 교통 상황, 접근성 정보는 현장 또는 제공처 사정에 따라 달라질 수 있습니다.',
      '회원은 방문 전 필요한 정보를 직접 확인해야 하며, 회사는 외부 정보 변경으로 인한 차이에 대해 책임을 지지 않습니다.',
    ],
  },
  {
    title: '5. 회원의 책임',
    body: [
      '회원은 본인의 계정을 안전하게 관리해야 하며, 타인의 계정이나 정보를 무단으로 사용해서는 안 됩니다.',
      '서비스를 비정상적으로 이용하거나, 허위 정보를 입력하거나, 다른 이용자의 이용을 방해하는 행위는 제한될 수 있습니다.',
    ],
  },
  {
    title: '6. 탈퇴 및 문의',
    body: [
      '회원은 마이페이지에서 언제든지 로그아웃하거나 회원 탈퇴를 요청할 수 있습니다.',
      '서비스 이용 중 문제가 발생하면 고객센터 챗봇을 통해 안내를 받을 수 있습니다.',
    ],
  },
]

function TermsPage() {
  const navigate = useNavigate()

  return (
    <main className="min-h-app bg-surface-muted">
      <header className="flex items-center gap-3 bg-white px-5 py-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors active:bg-ink/5"
          aria-label="뒤로 가기"
        >
          <ArrowLeft size={22} aria-hidden="true" />
        </button>
        <h1 className="text-lg font-extrabold text-ink">이용약관</h1>
      </header>

      <section className="px-6 py-7">
        <div className="rounded-card bg-white p-5 text-sm leading-6 text-ink/70 shadow-[0_2px_12px_-6px_rgb(20_20_43/0.12)]">
          <div className="border-b border-ink/10 pb-5">
            <h2 className="text-xl font-extrabold text-ink">같이가효 이용약관</h2>
            <p className="mt-2 text-xs font-semibold text-ink/45">시행일: 2026년 9월 12일</p>
            <p className="mt-4">
              본 약관은 카카오 계정으로 같이가효를 이용할 때 적용되는 기본 안내입니다.
              서비스 이용에 필요한 계정 정보와 취향 정보, 코스 추천 정보의 활용 범위를 설명합니다.
            </p>
          </div>

          <div className="space-y-6 pt-5">
            {TERMS_SECTIONS.map((section) => (
              <article key={section.title}>
                <h3 className="text-base font-extrabold text-ink">{section.title}</h3>
                <div className="mt-2 space-y-2">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default TermsPage
