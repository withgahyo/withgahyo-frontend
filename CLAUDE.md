# 같이가효 Frontend

## 프로젝트 개요

같이가효는 가족 구성원의 취향과 이동 편의 조건을 기반으로 AI가 여행 코스를 추천하는 모바일 퍼스트 웹앱이다.

주요 기능:
- 소셜 로그인
- 사용자 온보딩 및 취향 설정
- 가족 구성원 관리
- 여행 코스 생성
- AI 추천 코스 생성 및 비교
- 코스 상세 조회
- 여행 앨범
- 만족도 평가
- 알림

## 기술 스택

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- ESLint
- Prettier

## 핵심 원칙

- 모든 코드는 TypeScript로 작성한다.
- `any` 타입은 사용하지 않는다.
- 서버 상태는 TanStack Query로 관리한다.
- 전역 클라이언트 상태만 Zustand로 관리한다.
- 단순한 컴포넌트 내부 상태는 `useState`를 사용한다.
- 폼 상태는 React Hook Form을 사용하고 검증은 Zod를 사용한다.
- 컴포넌트에서 Axios를 직접 호출하지 않는다.
- API 요청은 `src/api`의 Axios 인스턴스와 도메인별 API 함수를 사용한다.
- 재사용 가능한 UI는 공통 컴포넌트로 분리한다.
- 모바일 퍼스트로 구현하고 기본 콘텐츠 최대 너비는 430px로 한다.
- API 명세와 Figma를 기준으로 구현하며 응답 필드를 임의로 추측하지 않는다.

## 작업 방식

Claude는 코드 수정 전에 다음을 먼저 제시한다.
1. 현재 구조와 관련 파일 분석
2. 수정 예정 파일 목록
3. 구현 계획
4. 위험 요소 또는 확인이 필요한 사항

사용자의 승인 후에만 코드를 수정한다.

- 한 번에 하나의 기능만 구현한다.
- 요청하지 않은 파일을 임의로 수정하지 않는다.
- 대규모 리팩토링이나 파일 이동 전에 반드시 계획을 제안한다.
- 구현 후 lint와 build를 실행한다.
- 오류를 남긴 채 작업을 종료하지 않는다.
- 변경 파일과 변경 이유를 요약한다.

## 프로젝트 문서

- `docs/frontend-architecture.md`
- `docs/api-convention.md`
- `docs/component-guide.md`
- `docs/style-guide.md`
- `docs/git-convention.md`

## 작업 완료 보고 형식

### 변경 파일
- `src/...`

### 구현 내용
- 구현한 기능
- 주요 설계 결정

### 실행 결과
- lint
- build
- test

### 남은 작업
- 후속 작업
- 알려진 제한사항
