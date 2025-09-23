// Application constants
export const APP_CONFIG = {
  name: 'Serenity Haven',
  description: 'Your trusted partner for retirement living and investment opportunities in Phuket, Thailand.',
  url: 'https://serenityhaven.com',
  email: 'info@serenityhaven.com',
  phone: '+66 76 123 456',
  address: 'Phuket, Thailand',
  social: {
    facebook: 'https://facebook.com/serenityhaven',
    instagram: 'https://instagram.com/serenityhaven',
    twitter: 'https://twitter.com/serenityhaven'
  }
} as const;

// API endpoints
export const API_ENDPOINTS = {
  inquiries: '/api/inquiries',
  cart: '/api/cart',
  cms: '/api/cms',
  auth: '/api/auth'
} as const;

// Form validation
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-()]+$/,
  minPasswordLength: 6,
  maxMessageLength: 1000
} as const;

// Pagination
export const PAGINATION = {
  defaultPageSize: 6,
  maxPageSize: 50
} as const;

// Cache durations (in milliseconds)
export const CACHE_DURATION = {
  short: 5 * 60 * 1000, // 5 minutes
  medium: 30 * 60 * 1000, // 30 minutes
  long: 24 * 60 * 60 * 1000 // 24 hours
} as const;