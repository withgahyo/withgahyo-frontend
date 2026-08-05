# Frontend Architecture

## 권장 폴더 구조

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

## 상태 관리 기준

- 서버 상태: TanStack Query
- 전역 클라이언트 상태: Zustand
- 단순 로컬 상태: useState
- 폼 상태: React Hook Form + Zod

API 응답 전체를 Zustand에 중복 저장하지 않는다.

앱 전역 Provider는 `src/providers/AppProviders.tsx`에서 구성하고, `src/main.tsx`에서 `<App />`을 감싸는 최상위 지점에 연결한다. `QueryClient` 인스턴스는 `src/providers/queryClient.ts`에서 생성한다.

## 라우팅 기준

```text
/splash
/login

/onboarding/duration
/onboarding/tourism
/onboarding/food
/onboarding/condition
/onboarding/complete

/home
/popular
/albums
/mypage

/courses/create/region
/courses/create/date
/courses/create/family
/courses/create/keywords
/courses/create/places
/courses/create/confirm

/courses/generating/:generationId
/courses/recommendations/:generationId
/courses/:courseId

/albums/:albumId
/notifications
/reviews/:courseId
```

`/`는 `/splash`로 리다이렉트한다. 인증/온보딩 상태 기반 리다이렉트는 이후 ProtectedRoute/AuthGuard 작업에서 처리한다.

## 레이아웃 기준

라우트는 `RootLayout` 아래 목적에 따라 세 종류의 레이아웃으로 감싼다.

- `RootLayout`: `AppContainer`(430px, `min-h-dvh`, safe area)로 전체를 감싸고 하위 레이아웃의 `Outlet`을 렌더링한다. 모든 라우트의 최상위 레이아웃이다.
- `MainTabLayout`: `/home`, `/popular`, `/albums`, `/mypage`에 사용한다. `BottomNavigation`을 노출한다.
- `FlowLayout`: 온보딩, 코스 생성, AI 생성/추천, 코스 상세, 앨범 상세, 알림, 만족도 평가 등 멀티스텝·상세 화면에 사용한다. 하단 탭을 노출하지 않는다. 공통 헤더나 진행률 표시를 강제하지 않으며, 화면별 Header/Step Indicator는 각 feature에서 선택적으로 구성한다.
- `FullscreenLayout`: `/splash`, `/login`에 사용한다. 헤더와 하단 탭을 모두 노출하지 않는다.
- 인증이 필요한 페이지는 보호 라우트(ProtectedRoute/AuthGuard)로 감싼다. (추후 작업)
