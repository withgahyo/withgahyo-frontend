import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import {
  createCourse,
  connectFamilyMember,
  findFamilyMemberCandidate,
  getCourseFamilyMembers,
  getCourseKeywordSuggestions,
  searchPlaces,
  searchRegions,
} from '../../api/course'
import type { CreateCourseRequest } from '../../api/course'
import { createCourseGeneration } from '../../api/courseGeneration'
import PrimaryButton from '../../components/common/PrimaryButton'
import CourseCreateHeader from '../../features/course/components/CourseCreateHeader'
import CourseNameField from '../../features/course/components/CourseNameField'
import RegionSelectField from '../../features/course/components/RegionSelectField'
import KeywordSelectSection from '../../features/course/components/KeywordSelectSection'
import PreferredPlaceSection from '../../features/course/components/PreferredPlaceSection'
import TravelDateCalendar from '../../features/course/components/TravelDateCalendar'
import FamilyMemberSelector from '../../features/course/components/FamilyMemberSelector'
import FamilyMemberConnectSheet from '../../features/course/components/FamilyMemberConnectSheet'
import { queryKeys } from '../../constants/queryKeys'
import { ROUTE_PATHS } from '../../routes/routePaths'
import { isSameDay } from '../../features/course/utils/calendarUtils'
import { isCourseNameValid } from '../../features/course/utils/validateCourseName'
import type { CourseCreateFormState, PlaceOption, RegionOption } from '../../features/course/types'

const INITIAL_FORM_STATE: CourseCreateFormState = {
  courseName: '',
  region: null,
  keywordIds: [],
  preferredPlaces: [],
  startDate: null,
  endDate: null,
  familyMemberIds: [],
}

function toggleId(ids: number[], id: number) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]
}

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function CourseCreatePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [form, setForm] = useState<CourseCreateFormState>(INITIAL_FORM_STATE)
  const [placeSearchQuery, setPlaceSearchQuery] = useState('')
  const [isFamilySheetOpen, setIsFamilySheetOpen] = useState(false)
  const [familyEmail, setFamilyEmail] = useState('')
  const [familyRelationship, setFamilyRelationship] = useState('부모')

  const regionsQuery = useQuery({
    queryKey: queryKeys.courseRegions,
    queryFn: () => searchRegions(),
  })
  const keywordsQuery = useQuery({
    queryKey: queryKeys.courseKeywords,
    queryFn: getCourseKeywordSuggestions,
  })
  const familyMembersQuery = useQuery({
    queryKey: queryKeys.courseFamilyMembers,
    queryFn: getCourseFamilyMembers,
  })
  const placeQueryText = placeSearchQuery.trim()
  const placesQuery = useQuery({
    queryKey:
      form.region && placeQueryText
        ? queryKeys.coursePlaces(form.region.areaCode, form.region.sigunguCode, placeQueryText)
        : queryKeys.coursePlaces('', '', ''),
    queryFn: () =>
      searchPlaces({
        areaCode: form.region?.areaCode ?? '',
        sigunguCode: form.region?.sigunguCode ?? '0',
        query: placeQueryText,
        size: 10,
      }),
    enabled: Boolean(form.region && placeQueryText),
  })
  // 코스 초안 생성(POST /courses) → 바로 AI Generation 생성(POST /courses/{id}/generations)까지
  // 한 mutation 으로 이어서 호출한다. 둘 중 하나라도 실패하면 mutation 전체가 실패 처리된다.
  const generateCourseMutation = useMutation({
    mutationFn: async (request: CreateCourseRequest) => {
      const course = await createCourse(request)
      const generation = await createCourseGeneration(course.courseId)
      return { courseId: course.courseId, generationId: generation.generationId }
    },
    onSuccess: ({ courseId, generationId }) => {
      navigate(
        ROUTE_PATHS.courseGenerating(String(courseId), String(generationId)),
        { state: { courseName: form.courseName }, replace: true },
      )
    },
  })
  const findFamilyCandidateMutation = useMutation({
    mutationFn: findFamilyMemberCandidate,
  })
  const connectFamilyMemberMutation = useMutation({
    mutationFn: connectFamilyMember,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.courseFamilyMembers })
      setForm((prev) => ({
        ...prev,
        familyMemberIds: prev.familyMemberIds.includes(response.familyMemberId)
          ? prev.familyMemberIds
          : [...prev.familyMemberIds, response.familyMemberId],
      }))
      closeFamilySheet()
    },
  })

  const regions =
    regionsQuery.data?.regions.map((region) => ({
      id: `${region.areaCode}:${region.sigunguCode}`,
      label: region.displayName,
      areaCode: region.areaCode,
      sigunguCode: region.sigunguCode,
    })) ?? []
  const keywords =
    keywordsQuery.data?.keywords.map((keyword) => ({
      id: keyword.keywordId,
      label: keyword.name,
    })) ?? []
  const familyMembers =
    familyMembersQuery.data?.familyMembers.map((member) => ({
      id: member.familyMemberId,
      name: member.nickname,
      relationship: member.relationship,
      profileImageUrl: member.profileImageUrl,
    })) ?? []
  const places =
    placesQuery.data?.places.map<PlaceOption>((place) => ({
      id: place.placeId,
      label: place.name,
      address: place.address,
    })) ?? []

  const handleSelectDate = (date: Date) => {
    setForm((prev) => {
      const { startDate, endDate } = prev

      if (!startDate) return { ...prev, startDate: date, endDate: null }

      if (!endDate) {
        if (isSameDay(date, startDate)) return { ...prev, endDate: date }
        if (date.getTime() < startDate.getTime()) {
          return { ...prev, startDate: date, endDate: startDate }
        }
        return { ...prev, endDate: date }
      }

      return { ...prev, startDate: date, endDate: null }
    })
  }

  const handleSelectRegion = (region: RegionOption) => {
    setForm((prev) =>
      prev.region?.id === region.id ? prev : { ...prev, region, preferredPlaces: [] },
    )
    setPlaceSearchQuery('')
  }

  const handleAddPlace = (place: PlaceOption) => {
    setForm((prev) =>
      prev.preferredPlaces.some((item) => item.id === place.id)
        ? prev
        : { ...prev, preferredPlaces: [...prev.preferredPlaces, place] },
    )
  }

  const handleRemovePlace = (id: number) => {
    setForm((prev) => ({
      ...prev,
      preferredPlaces: prev.preferredPlaces.filter((place) => place.id !== id),
    }))
  }

  const isFormValid =
    isCourseNameValid(form.courseName) &&
    form.region !== null &&
    form.startDate !== null &&
    form.endDate !== null

  const handleGenerate = () => {
    if (!isFormValid || !form.region || !form.startDate || !form.endDate) return

    generateCourseMutation.mutate({
      title: form.courseName,
      areaCode: form.region.areaCode,
      sigunguCode: form.region.sigunguCode,
      startDate: formatDate(form.startDate),
      endDate: formatDate(form.endDate),
      familyMemberIds: form.familyMemberIds,
      keywordIds: form.keywordIds,
      mustVisitPlaceIds: form.preferredPlaces.map((place) => place.id),
      transportMode: 'CAR',
    })
  }

  const closeFamilySheet = () => {
    setIsFamilySheetOpen(false)
    setFamilyEmail('')
    setFamilyRelationship('부모')
    findFamilyCandidateMutation.reset()
    connectFamilyMemberMutation.reset()
  }

  const handleFindFamilyCandidate = () => {
    const email = familyEmail.trim()
    if (!email) return
    connectFamilyMemberMutation.reset()
    findFamilyCandidateMutation.mutate(email)
  }

  const handleConnectFamilyMember = () => {
    const candidate = findFamilyCandidateMutation.data
    if (!candidate || candidate.alreadyConnected) return

    connectFamilyMemberMutation.mutate({
      familyUserId: candidate.userId,
      relationship: familyRelationship,
    })
  }

  return (
    <div className="relative -mt-[env(safe-area-inset-top)] -mb-[env(safe-area-inset-bottom)] flex h-app flex-col overflow-hidden">
      <CourseCreateHeader />

      <div className="relative -mt-6 min-h-0 flex-1 overflow-y-auto rounded-t-card bg-white">
        <div className="flex flex-col gap-7 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-8">
          <CourseNameField
            value={form.courseName}
            onChange={(courseName) => setForm((prev) => ({ ...prev, courseName }))}
          />

          <RegionSelectField
            value={form.region}
            regions={regions}
            isLoading={regionsQuery.isLoading}
            errorMessage={regionsQuery.isError ? '지역 목록을 불러오지 못했습니다.' : undefined}
            onSelect={handleSelectRegion}
          />

          <PreferredPlaceSection
            regionId={form.region?.id ?? null}
            searchQuery={placeSearchQuery}
            places={places}
            isLoading={placesQuery.isFetching}
            errorMessage={placesQuery.isError ? '장소 검색 결과를 불러오지 못했습니다.' : undefined}
            selectedPlaces={form.preferredPlaces}
            onSearchQueryChange={setPlaceSearchQuery}
            onAdd={handleAddPlace}
            onRemove={handleRemovePlace}
          />

          <KeywordSelectSection
            keywords={keywords}
            isLoading={keywordsQuery.isLoading}
            errorMessage={keywordsQuery.isError ? '키워드를 불러오지 못했습니다.' : undefined}
            selectedIds={form.keywordIds}
            onToggle={(id) =>
              setForm((prev) => ({ ...prev, keywordIds: toggleId(prev.keywordIds, id) }))
            }
          />

          <TravelDateCalendar
            startDate={form.startDate}
            endDate={form.endDate}
            onSelectDate={handleSelectDate}
          />

          <FamilyMemberSelector
            familyMembers={familyMembers}
            isLoading={familyMembersQuery.isLoading}
            errorMessage={
              familyMembersQuery.isError ? '가족 구성원을 불러오지 못했습니다.' : undefined
            }
            selectedIds={form.familyMemberIds}
            onToggle={(id) =>
              setForm((prev) => ({
                ...prev,
                familyMemberIds: toggleId(prev.familyMemberIds, id),
              }))
            }
            onAddClick={() => setIsFamilySheetOpen(true)}
          />

          {generateCourseMutation.isError && (
            <p className="text-center text-sm text-red-500">
              코스 생성에 실패했습니다. 잠시 후 다시 시도해주세요.
            </p>
          )}

          <PrimaryButton
            variant="lime"
            disabled={!isFormValid || generateCourseMutation.isPending}
            onClick={handleGenerate}
          >
            {generateCourseMutation.isPending ? '생성 중...' : 'AI 코스 생성하기'}
          </PrimaryButton>
        </div>
      </div>

      <FamilyMemberConnectSheet
        isOpen={isFamilySheetOpen}
        email={familyEmail}
        candidate={findFamilyCandidateMutation.data ?? null}
        relationship={familyRelationship}
        isFinding={findFamilyCandidateMutation.isPending}
        isConnecting={connectFamilyMemberMutation.isPending}
        findError={findFamilyCandidateMutation.error ?? null}
        connectError={connectFamilyMemberMutation.error ?? null}
        onEmailChange={(email) => {
          setFamilyEmail(email)
          findFamilyCandidateMutation.reset()
          connectFamilyMemberMutation.reset()
        }}
        onRelationshipChange={setFamilyRelationship}
        onFind={handleFindFamilyCandidate}
        onConnect={handleConnectFamilyMember}
        onClose={closeFamilySheet}
      />
    </div>
  )
}

export default CourseCreatePage
