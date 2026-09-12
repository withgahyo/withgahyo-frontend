import { ArrowLeft, Bot, RefreshCcw, Send, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SupportTopic {
  label: string
  keywords: string[]
  answer: string
  steps: string[]
}

interface ChatMessage {
  id: number
  role: 'bot' | 'user'
  text: string
}

const SUPPORT_TOPICS: SupportTopic[] = [
  {
    label: '로그인이 안 돼요',
    keywords: ['로그인', '카카오', '구글', '계정', '토큰'],
    answer: '로그인 문제가 있군요. 먼저 아래 순서대로 확인해 주세요.',
    steps: [
      '사용 중인 소셜 계정이 이전에 가입한 계정과 같은지 확인해 주세요.',
      '브라우저 또는 앱을 완전히 종료한 뒤 다시 실행해 주세요.',
      '문제가 계속되면 마이페이지에서 로그아웃 후 같은 소셜 계정으로 다시 로그인해 주세요.',
    ],
  },
  {
    label: '코스 추천이 이상해요',
    keywords: ['코스', '추천', '장소', '여행', '동선'],
    answer: '코스 추천 결과가 기대와 다르다면 취향 조건이 오래됐을 수 있어요.',
    steps: [
      '마이페이지의 나의 여행 취향 관리에서 관광 취향과 식사 취향을 다시 확인해 주세요.',
      '걷는 시간, 휴식 필요도, 계단·경사 부담 조건을 현재 상태에 맞게 조정해 주세요.',
      '추천 코스를 다시 생성하면 변경된 조건이 반영됩니다.',
    ],
  },
  {
    label: '가족 연결이 안 돼요',
    keywords: ['가족', '연결', '초대', '이메일', '구성원'],
    answer: '가족 연결은 상대방 계정의 이메일 정보가 정확해야 해요.',
    steps: [
      '상대방이 같이가효에 가입한 이메일을 입력했는지 확인해 주세요.',
      '이미 연결된 가족 구성원인지 확인해 주세요.',
      '상대방이 탈퇴했거나 이메일 정보가 없는 계정이면 연결할 수 없습니다.',
    ],
  },
  {
    label: '여행 취향을 바꾸고 싶어요',
    keywords: ['취향', '선호', '음식', '관광', '컨디션'],
    answer: '여행 취향은 언제든지 마이페이지에서 다시 수정할 수 있어요.',
    steps: [
      '마이페이지에서 나의 여행 취향 관리를 선택해 주세요.',
      '회원가입 때와 같은 순서로 관광 취향, 식사 취향, 컨디션을 수정해 주세요.',
      '마지막 단계에서 저장하기를 누르면 다음 추천부터 반영됩니다.',
    ],
  },
  {
    label: '프로필을 수정하고 싶어요',
    keywords: ['프로필', '이름', '사진', '이미지', '개인정보'],
    answer: '프로필 정보는 개인정보 관리 화면에서 확인하고 수정할 수 있어요.',
    steps: [
      '마이페이지에서 개인정보 관리를 선택해 주세요.',
      '이름을 수정한 뒤 저장하기를 눌러 주세요.',
      '프로필 사진은 현재 화면에서 선택 미리보기를 지원하며, 서버 저장은 업로드 API 연결 후 제공됩니다.',
    ],
  },
  {
    label: '오류가 발생했어요',
    keywords: ['오류', '에러', '안됨', '안 돼', '실패', '멈춤'],
    answer: '일시적인 오류일 수 있어요. 아래 방법으로 먼저 복구를 시도해 주세요.',
    steps: [
      '화면을 새로고침하거나 앱을 다시 실행해 주세요.',
      '네트워크 연결 상태를 확인해 주세요.',
      '같은 문제가 반복되면 어떤 화면에서 어떤 버튼을 눌렀는지 기록해 두면 원인 확인에 도움이 됩니다.',
    ],
  },
]

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: 'bot',
    text: '안녕하세요. 같이가효 고객센터예요. 겪고 있는 문제를 선택하거나 직접 입력해 주세요.',
  },
]

function createBotAnswer(topic: SupportTopic) {
  return `${topic.answer}\n\n${topic.steps
    .map((step, index) => `${index + 1}. ${step}`)
    .join('\n')}\n\n해결되지 않았다면 더 자세히 입력해 주세요.`
}

function findTopicByText(text: string) {
  const normalizedText = text.replace(/\s/g, '').toLowerCase()

  return SUPPORT_TOPICS.find((topic) =>
    topic.keywords.some((keyword) => normalizedText.includes(keyword.replace(/\s/g, '').toLowerCase())),
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isBot = message.role === 'bot'
  const Icon = isBot ? Bot : User

  return (
    <div className={`flex items-start gap-3 ${isBot ? '' : 'justify-end'}`}>
      {isBot && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-lime text-brand-blue">
          <Icon size={22} aria-hidden="true" />
        </div>
      )}
      <div
        className={`max-w-[82%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm font-semibold leading-6 [word-break:keep-all] ${
          isBot
            ? 'rounded-tl-sm bg-white text-ink shadow-[0_2px_12px_-6px_rgb(20_20_43/0.16)]'
            : 'rounded-tr-sm bg-brand-blue text-white'
        }`}
      >
        {message.text}
      </div>
      {!isBot && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue">
          <Icon size={20} aria-hidden="true" />
        </div>
      )}
    </div>
  )
}

function SupportChatPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')

  const nextId = useMemo(() => messages.length + 1, [messages.length])
  const normalizedInput = inputValue.trim()
  const canSend = normalizedInput.length > 0

  const appendConversation = (userText: string, botText: string) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: nextId, role: 'user', text: userText },
      { id: nextId + 1, role: 'bot', text: botText },
    ])
  }

  const handleTopicClick = (topic: SupportTopic) => {
    appendConversation(topic.label, createBotAnswer(topic))
  }

  const handleSend = () => {
    if (!canSend) return

    const matchedTopic = findTopicByText(normalizedInput)
    const botText = matchedTopic
      ? createBotAnswer(matchedTopic)
      : '아직 정확한 해결 방법을 찾지 못했어요. 아래 빠른 선택지 중 가장 가까운 항목을 골라보거나, 문제가 발생한 화면과 버튼 이름을 함께 입력해 주세요.'

    appendConversation(normalizedInput, botText)
    setInputValue('')
  }

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES)
    setInputValue('')
  }

  return (
    <main className="flex min-h-app flex-col bg-surface-muted">
      <header className="flex items-center justify-between bg-white px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors active:bg-ink/5"
            aria-label="뒤로 가기"
          >
            <ArrowLeft size={22} aria-hidden="true" />
          </button>
          <h1 className="text-lg font-extrabold text-ink">고객센터</h1>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink/55 transition-colors active:bg-ink/5"
          aria-label="대화 초기화"
        >
          <RefreshCcw size={18} aria-hidden="true" />
        </button>
      </header>

      <section className="flex flex-1 flex-col px-6 py-7">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          {SUPPORT_TOPICS.map((topic) => (
            <button
              key={topic.label}
              type="button"
              onClick={() => handleTopicClick(topic)}
              className="min-h-11 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-bold leading-5 text-ink/65 transition-colors [word-break:keep-all] active:border-brand-blue active:text-brand-blue"
            >
              {topic.label}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <div className="flex items-end gap-2 rounded-3xl bg-white p-2 shadow-[0_2px_12px_-6px_rgb(20_20_43/0.16)]">
            <textarea
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  handleSend()
                }
              }}
              rows={1}
              className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm font-semibold leading-6 text-ink outline-none placeholder:text-ink/25"
              placeholder="문제를 입력해 주세요"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
              aria-label="메시지 보내기"
            >
              <Send size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SupportChatPage
