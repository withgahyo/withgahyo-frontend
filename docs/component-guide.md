# Component Guide

## 네이밍 규칙

- React 컴포넌트: PascalCase
- 컴포넌트 파일: PascalCase.tsx
- Hook: use로 시작하는 camelCase
- 함수 및 변수: camelCase
- 상수: UPPER_SNAKE_CASE
- 타입과 인터페이스: PascalCase

boolean 변수 접두사: `is`, `has`, `can`, `should`
이벤트 핸들러 접두사: `handle`

## 역할 분리

- 페이지 컴포넌트는 화면 조합과 데이터 연결을 담당한다.
- 공통 UI 컴포넌트는 비즈니스 로직을 최소화한다.
- 복잡한 데이터 가공은 hook 또는 util로 분리한다.
- Props 타입을 반드시 선언한다.
- 목록 렌더링에서 배열 index를 key로 사용하지 않는다.
- 같은 UI를 복사하지 말고 공통 컴포넌트로 추출한다.

## 우선 제작할 공통 컴포넌트

```text
AppHeader
BottomNavigation
PrimaryButton
SecondaryButton
TextInput
SelectChip
ImageCard
ConfirmModal
BottomSheet
LoadingSpinner
EmptyState
ErrorState
Toast
```
