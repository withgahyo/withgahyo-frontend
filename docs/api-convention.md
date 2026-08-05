# API Convention

## 환경 변수

```text
VITE_API_BASE_URL
```

## 공통 응답 타입

`src/types/api.ts`

```ts
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export interface ApiError {
  code: string;
  message: string;
  status?: number;
  cause?: unknown;
}
```

`ApiError`는 Axios 응답 인터셉터가 모든 실패 응답을 변환하는 공통 형태다. `cause`는 원본 에러를 디버깅용으로만 보관한다.

## API 작성 규칙

- API Path는 `/api/v1` 기준을 따른다.
- 컴포넌트에서 Axios를 직접 import하지 않는다.
- API 함수는 `src/api` 아래 도메인별 파일에 작성한다.
- API 타입은 명세와 동일하게 작성한다.
- 응답 필드나 Enum을 임의로 추가하지 않는다.
- 공통 Axios 인스턴스는 `src/api/client.ts`(`apiClient`)를 사용한다. `baseURL`은 `VITE_API_BASE_URL`, `timeout`은 10000ms다.
- 인증 토큰 저장/주입 정책은 아직 확정되지 않았다. 요청 인터셉터는 현재 통과 구조만 가지며, 이후 인증 로직이 확정되면 이 위치에 연결한다.
- 응답 실패는 `apiClient`의 응답 인터셉터가 `ApiError`로 변환해 reject한다. 도메인 API 함수/화면에서 별도로 axios 에러를 직접 파싱하지 않는다.

## API 함수 네이밍

```text
getHome
getCourse
createCourse
updateProfile
deletePhoto
```

## TanStack Query 규칙

Query Key는 `src/constants/queryKeys.ts`의 `queryKeys`에서 중앙 관리한다. 화면/훅에서 배열 리터럴을 직접 작성하지 않는다.

```ts
queryKeys.home
queryKeys.popular
queryKeys.notifications
queryKeys.course(courseId)
queryKeys.album(albumId)
```

`QueryClient` 기본 옵션(`src/providers/queryClient.ts`)은 다음과 같다. 화면별로 다른 정책이 필요하면 개별 쿼리에서 override한다.

```ts
queries: {
  retry: 1,
  staleTime: 60 * 1000,
  gcTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false,
},
mutations: {
  retry: 0,
}
```

- 조회는 `useQuery`
- 생성, 수정, 삭제는 `useMutation`
- mutation 성공 후 관련 query를 invalidate한다.
- 로딩, 에러, 빈 상태를 반드시 처리한다.
- 중복 Query 코드는 custom hook으로 분리한다.
