import type { CourseCandidateDetailResponse } from '../../../api/courseGeneration'
import { daysToCoursePlaces } from './toCourseDetail'
import type { CourseCandidateDetailView } from '../types'

export function toCandidateDetailView(
  response: CourseCandidateDetailResponse,
): CourseCandidateDetailView {
  return {
    candidateId: response.candidateId,
    generationId: response.generationId,
    title: response.title,
    summary: response.summary,
    matchScore: response.matchScore,
    tags: response.tags ?? [],
    recommendationReasons: response.recommendationReasons ?? [],
    accessibilityHighlights: response.accessibilityHighlights ?? [],
    places: daysToCoursePlaces(response.days),
  }
}
