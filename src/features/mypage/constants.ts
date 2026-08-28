import {
  Bell,
  ChevronRight,
  FileText,
  Headphones,
  Heart,
  LogOut,
  Settings,
} from 'lucide-react'

export const PROFILE = {
  name: '홍길동 사장님',
  emptyEmail: '이메일 정보 없음',
} as const

export const MY_INFO_MENU_ITEMS = [
  {
    label: '나의 여행 취향 관리',
    description: '추천에 쓰이는 선호 조건을 바꿔요',
    Icon: Heart,
    TrailingIcon: ChevronRight,
  },
  {
    label: '개인정보 관리',
    description: '프로필과 계정 정보를 확인해요',
    Icon: Settings,
    TrailingIcon: ChevronRight,
  },
] as const

export const SETTING_MENU_ITEMS = [
  {
    label: '알림 설정',
    description: '코스와 가족 초대 알림을 관리해요',
    Icon: Bell,
    TrailingIcon: ChevronRight,
  },
  {
    label: '고객센터',
    description: '문의와 도움말을 확인해요',
    Icon: Headphones,
    TrailingIcon: ChevronRight,
  },
  {
    label: '이용약관',
    description: '서비스 약관과 정책을 확인해요',
    Icon: FileText,
    TrailingIcon: ChevronRight,
  },
  {
    label: '로그아웃',
    description: '현재 계정에서 로그아웃해요',
    Icon: LogOut,
    TrailingIcon: ChevronRight,
  },
] as const
