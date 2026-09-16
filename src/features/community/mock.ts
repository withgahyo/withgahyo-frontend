import courseDaejeon from '../../assets/home/course-daejeon.jpeg'
import courseGangneung from '../../assets/home/course-gangneung.jpeg'
import courseJeonju from '../../assets/home/course-jeonju.jpeg'
import type {
  CommunityCommentResponse,
  CommunityPostDetailResponse,
  CommunityPostListResponse,
  CommunityPostSummaryResponse,
} from '../../api/community'

export const COMMUNITY_CATEGORY_LABELS: Record<string, string> = {
  ALL: '전체',
  FREE: '자유',
  QUESTION: '질문',
  REVIEW: '후기',
  INFO: '정보',
  TRAVEL_TIP: '후기',
}

export const COMMUNITY_THUMBNAILS = [courseDaejeon, courseGangneung, courseJeonju]

export const MOCK_COMMUNITY_POSTS: CommunityPostSummaryResponse[] = [
  {
    postId: 101,
    authorId: 11,
    authorNickname: '김가효',
    category: 'REVIEW',
    title: '부모님과 경주 여행 후기',
    contentPreview: '부모님 모시고 경주 다녀왔는데 생각보다 만족도가 정말 높았습니다.',
    commentCount: 3,
    likeCount: 15,
    createdAt: '2026-08-24T10:14:00',
  },
  {
    postId: 102,
    authorId: 12,
    authorNickname: '효자손',
    category: 'FREE',
    title: '여행 갈 때 챙겨야 할 필수템은?',
    contentPreview: '전 개인적으로 경량이라고 생각해요. 부모님 짐까지 같이 챙기면 차이가 커요.',
    commentCount: 4,
    likeCount: 2,
    createdAt: '2026-08-23T18:20:00',
  },
  {
    postId: 103,
    authorId: 13,
    authorNickname: '가치가효',
    category: 'QUESTION',
    title: '주말에 갈만한 서울 카페 추천해 주세요!',
    contentPreview: '엘리베이터 있고 좌석 간격 넓은 곳이면 더 좋아요.',
    commentCount: 2,
    likeCount: 8,
    createdAt: '2026-08-22T09:40:00',
  },
  {
    postId: 104,
    authorId: 14,
    authorNickname: '여행러',
    category: 'INFO',
    title: '부산 여행 다녀왔는데 야경이 최고였어요!',
    contentPreview: '해변 산책길이 잘 되어 있어서 저녁 일정으로 추천합니다.',
    commentCount: 5,
    likeCount: 12,
    createdAt: '2026-08-21T20:10:00',
  },
  {
    postId: 105,
    authorId: 15,
    authorNickname: '효자손',
    category: 'REVIEW',
    title: '최고의 부산 여행 후기',
    contentPreview: '부모님과 함께 가기 좋은 동선 위주로 다녀왔습니다.',
    commentCount: 1,
    likeCount: 9,
    createdAt: '2026-08-20T12:30:00',
  },
]

export const MOCK_COMMUNITY_POST_LIST: CommunityPostListResponse = {
  posts: MOCK_COMMUNITY_POSTS,
  hasNext: false,
  nextCursor: null,
}

export const MOCK_RECOMMENDED_POST_LIST: CommunityPostListResponse = {
  posts: [MOCK_COMMUNITY_POSTS[0], MOCK_COMMUNITY_POSTS[3], MOCK_COMMUNITY_POSTS[2]],
  hasNext: false,
  nextCursor: null,
}

export const MOCK_COMMUNITY_DETAIL: CommunityPostDetailResponse = {
  postId: 101,
  authorId: 11,
  authorNickname: '김가효',
  category: 'REVIEW',
  title: '부모님과 경주 여행 후기',
  content:
    '부모님 모시고 경주 다녀왔는데 생각보다 만족도가 정말 높았습니다. 사실 부모님이랑 여행 가면 제가 가고 싶은 곳이랑 부모님이 좋아하시는 곳이 달라서 걱정했는데, 경주는 둘 다 만족시키기 괜찮더라고요.\n\n불국사는 부모님이 특히 좋아하셨어요. 역사적인 곳이라 그런지 천천히 둘러보시면서 설명도 읽어보시고 사진도 많이 찍으셨습니다. 입장료 너무 복잡하지 않고 앉을 데도 중간중간 있어서 좋았습니다.\n\n첨성대 근처는 저녁에 산책하기 좋았습니다. 하늘 느낌 나는 카페도 많고 구경할 것도 많아서 걷다가 쉬다가 하기 좋았습니다.',
  commentCount: 1,
  likeCount: 15,
  createdAt: '2026-08-24T10:14:00',
}

export const MOCK_COMMUNITY_COMMENTS: CommunityCommentResponse[] = [
  {
    commentId: 201,
    authorId: 21,
    authorNickname: '효자손',
    content: '좋은 후기 감사합니다!',
    createdAt: '2026-08-24T11:10:00',
  },
]
