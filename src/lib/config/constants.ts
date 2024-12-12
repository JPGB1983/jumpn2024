export const APP_CONFIG = {
  name: 'JumpN',
  description: 'Executive Recruitment Platform',
  version: '1.0.0',
} as const;

export const STORAGE_LIMITS = {
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  VIDEO_MAX_SIZE: 50 * 1024 * 1024, // 50MB
} as const;

export const ROUTES = {
  HOME: '/',
  PRICING: '/pricing',
  CANDIDATE: {
    SIGNIN: '/candidate/signin',
    SIGNUP: '/candidate/signup',
    DASHBOARD: '/candidate/dashboard',
    PROFILE: '/candidate/profile',
  },
  COMPANY: {
    SIGNIN: '/company/signin',
    SIGNUP: '/company/signup',
    DASHBOARD: '/company/dashboard',
    PROFILE: '/company/profile',
    SEARCH: '/search',
  },
  AUTH: {
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
} as const;

export const API_ENDPOINTS = {
  SUBSCRIPTIONS: '/api/subscriptions',
} as const;