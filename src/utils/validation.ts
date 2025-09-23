import { VALIDATION_RULES } from './constants';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else if (!VALIDATION_RULES.email.test(email)) {
    errors.push('Please enter a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];
  
  if (phone && !VALIDATION_RULES.phone.test(phone)) {
    errors.push('Please enter a valid phone number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < VALIDATION_RULES.minPasswordLength) {
    errors.push(`Password must be at least ${VALIDATION_RULES.minPasswordLength} characters long`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  const errors: string[] = [];
  
  if (!value || value.trim().length === 0) {
    errors.push(`${fieldName} is required`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateForm(data: Record<string, any>, rules: Record<string, (value: any) => ValidationResult>): ValidationResult {
  const allErrors: string[] = [];

  Object.entries(rules).forEach(([field, validator]) => {
    const result = validator(data[field]);
    if (!result.isValid) {
      allErrors.push(...result.errors);
    }
  });

  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
}