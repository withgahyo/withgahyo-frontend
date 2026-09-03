import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import MainTabLayout from '../layouts/MainTabLayout'
import FlowLayout from '../layouts/FlowLayout'
import FullscreenLayout from '../layouts/FullscreenLayout'

import SplashPage from '../pages/splash/SplashPage'
import LoginPage from '../pages/login/LoginPage'
import OAuthCallbackPage from '../pages/login/OAuthCallbackPage'

import OnboardingTourismPage from '../pages/onboarding/OnboardingTourismPage'
import OnboardingFoodPage from '../pages/onboarding/OnboardingFoodPage'
import OnboardingConditionPage from '../pages/onboarding/OnboardingConditionPage'
import OnboardingCompletePage from '../pages/onboarding/OnboardingCompletePage'

import HomePage from '../pages/home/HomePage'
import PopularPage from '../pages/popular/PopularPage'
import AlbumsPage from '../pages/albums/AlbumsPage'
import AlbumDetailPage from '../pages/albums/AlbumDetailPage'
import MyPage from '../pages/mypage/MyPage'

import CourseCreatePage from '../pages/course/CourseCreatePage'
import CourseGeneratingPage from '../pages/course/CourseGeneratingPage'
import CourseRecommendationsPage from '../pages/course/CourseRecommendationsPage'
import CourseDetailPage from '../pages/course/CourseDetailPage'

import NotificationPage from '../pages/notification/NotificationPage'
import ReviewPage from '../pages/review/ReviewPage'
import NotFoundPage from '../pages/not-found/NotFoundPage'

import AuthGuard from './AuthGuard'
import { ROUTE_PATHS } from './routePaths'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <FullscreenLayout />,
        children: [
          { path: ROUTE_PATHS.splash, element: <SplashPage /> },
          { path: ROUTE_PATHS.login, element: <LoginPage /> },
          {
            path: ROUTE_PATHS.kakaoOAuthCallback,
            element: <OAuthCallbackPage provider="kakao" />,
          },
          {
            path: ROUTE_PATHS.googleOAuthCallback,
            element: <OAuthCallbackPage provider="google" />,
          },
        ],
      },
      {
        element: <AuthGuard />,
        children: [
          {
            element: <MainTabLayout />,
            children: [
              { path: ROUTE_PATHS.home, element: <HomePage /> },
              { path: ROUTE_PATHS.popular, element: <PopularPage /> },
              { path: ROUTE_PATHS.albums, element: <AlbumsPage /> },
              { path: ROUTE_PATHS.mypage, element: <MyPage /> },
            ],
          },
        ],
      },
      {
        element: <AuthGuard />,
        children: [
          {
            element: <FlowLayout />,
            children: [
              {
                path: ROUTE_PATHS.onboardingTourism,
                element: <OnboardingTourismPage />,
              },
              {
                path: ROUTE_PATHS.onboardingFood,
                element: <OnboardingFoodPage />,
              },
              {
                path: ROUTE_PATHS.onboardingCondition,
                element: <OnboardingConditionPage />,
              },
              {
                path: ROUTE_PATHS.onboardingComplete,
                element: <OnboardingCompletePage />,
              },

              {
                path: ROUTE_PATHS.courseCreate,
                element: <CourseCreatePage />,
              },

              {
                path: '/courses/generating/:generationId',
                element: <CourseGeneratingPage />,
              },
              {
                path: '/courses/recommendations/:generationId',
                element: <CourseRecommendationsPage />,
              },
              { path: '/courses/:courseId', element: <CourseDetailPage /> },

              { path: '/albums/:albumId', element: <AlbumDetailPage /> },
              { path: ROUTE_PATHS.notifications, element: <NotificationPage /> },
              { path: '/reviews/:courseId', element: <ReviewPage /> },
            ],
          },
        ],
      },
      { index: true, element: <Navigate to={ROUTE_PATHS.splash} replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
