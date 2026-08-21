const COURSE_NAME_MIN_LENGTH = 2
const COURSE_NAME_MAX_LENGTH = 10
const COURSE_NAME_PATTERN = /^[a-zA-Z0-9가-힣]*$/

export function isCourseNameCharAllowed(value: string) {
  return COURSE_NAME_PATTERN.test(value)
}

export function isCourseNameValid(value: string) {
  return (
    value.length >= COURSE_NAME_MIN_LENGTH &&
    value.length <= COURSE_NAME_MAX_LENGTH &&
    isCourseNameCharAllowed(value)
  )
}

// 허용되지 않는 문자만 제거하고 길이를 자른다. IME 조합 중(한글 입력 등)에는 쓰지 않고
// 조합이 끝난 뒤에만 적용해야 조합 중간 상태(자모 단독 등)가 걸러지며 입력이 끊기지 않는다.
export function sanitizeCourseName(value: string) {
  return value.replace(/[^a-zA-Z0-9가-힣]/g, '').slice(0, COURSE_NAME_MAX_LENGTH)
}

export { COURSE_NAME_MAX_LENGTH }
