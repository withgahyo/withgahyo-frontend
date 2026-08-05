# 같이가효 (WithGahyo) Frontend

가족 구성원의 취향과 이동 편의 조건을 기반으로 AI가 여행 코스를 추천하는 모바일 퍼스트 웹앱입니다.

## 기술 스택

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router, TanStack Query, Zustand, Axios, React Hook Form + Zod (설치 완료, 기능 구현 시 순차 연동)
- ESLint, Prettier

## 실행 방법

```bash
yarn install
cp .env.example .env.local   # VITE_API_BASE_URL 설정
yarn dev       # 개발 서버
yarn build     # 프로덕션 빌드
yarn lint      # 린트
yarn format    # 코드 포맷팅
yarn preview   # 빌드 결과 미리보기
```

## 폴더 구조

```text
src/
├── api/
├── assets/
├── components/
│   ├── common/
│   └── layout/
├── constants/
├── features/
│   ├── auth/
│   ├── onboarding/
│   ├── home/
│   ├── course/
│   ├── album/
│   ├── mypage/
│   └── notification/
├── hooks/
├── layouts/
├── pages/
├── providers/
├── routes/
├── stores/
├── styles/
├── types/
└── utils/
```

자세한 규칙은 `docs/` 디렉터리를 참고하세요.

- `docs/frontend-architecture.md`
- `docs/api-convention.md`
- `docs/component-guide.md`
- `docs/style-guide.md`
- `docs/git-convention.md`
