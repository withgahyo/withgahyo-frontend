import { ROUTE_PATHS } from '../../routes/routePaths.ts'

export const MY_REVIEW_FEED_BACK_TO = ROUTE_PATHS.communityWithTab('mine')

export interface BackNavigationState {
  backTo?: string
}

export function getCourseBackDestination(backTo: unknown) {
  return typeof backTo === 'string' && backTo.length > 0 ? backTo : null
}

export function getReviewDetailBackDestination(
  state: BackNavigationState | null | undefined,
) {
  return getCourseBackDestination(state?.backTo) ?? ROUTE_PATHS.myReviews
}
