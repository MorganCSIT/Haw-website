import { AuthError } from '@supabase/supabase-js';

export function getAuthErrorMessage(error: AuthError): string {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Invalid email or password. Please check your credentials and try again.';
    case 'Email not confirmed':
      return 'Please verify your email address before logging in.';
    case 'User already registered':
      return 'This email is already registered. Please try logging in instead.';
    case 'Password should be at least 6 characters':
      return 'Password must be at least 6 characters long.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
}

export function isEmailVerificationError(error: AuthError): boolean {
  return error.message === 'Email not confirmed';
}

export function isUserRegistered(error: AuthError): boolean {
  return error.message === 'User already registered';
}