// API Configuration
// Empty string routes through the Vite dev-server proxy (/api → http://localhost:8080).
// Set VITE_API_BASE_URL to the backend origin only for production builds.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
export const API_ENDPOINTS = {
  ANALYZE_REPOSITORY: '/api/repositories/analyze',
  GET_REPOSITORY: '/api/repositories',
  GET_HISTORY: '/api/repositories/history',
  HEALTH_CHECK: '/api/health',
}

// Application Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  ANALYZE: '/analyze',
  HISTORY: '/history',
  EXTENSION: '/extension',
}

// Feature Flags
export const FEATURES = {
  ENABLE_ANIMATIONS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_EXTENSION_PROMO: true,
}

// Repository Analysis Categories
export const ANALYSIS_CATEGORIES = {
  OVERVIEW: 'overview',
  ACTIVITY: 'activity',
  CONTRIBUTORS: 'contributors',
  LANGUAGES: 'languages',
  ISSUES: 'issues',
  PULL_REQUESTS: 'pull_requests',
}

// Status Types
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'github-analyzer-theme',
  USER_PREFERENCES: 'github-analyzer-preferences',
  RECENT_REPOSITORIES: 'github-analyzer-recent',
}

// Extension Links
export const EXTENSION_LINKS = {
  CHROME: 'https://chrome.google.com/webstore',
  FIREFOX: 'https://addons.mozilla.org',
  EDGE: 'https://microsoftedge.microsoft.com/addons',
}

// Social Links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/yourusername/github-repo-analyzer',
  TWITTER: 'https://twitter.com/yourusername',
  LINKEDIN: 'https://linkedin.com/in/yourusername',
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
}

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  ROUTES,
  FEATURES,
  ANALYSIS_CATEGORIES,
  STATUS,
  STORAGE_KEYS,
  EXTENSION_LINKS,
  SOCIAL_LINKS,
  PAGINATION,
}
