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

export { COURSE_NAME_MAX_LENGTH }
