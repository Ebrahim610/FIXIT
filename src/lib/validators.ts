// Each validator returns an error message, or undefined when the value is fine.

export function validateRequired(value: string, fieldName: string) {
  if (!value.trim()) return `${fieldName} is required.`;
  return undefined;
}

export function validateEmail(value: string) {
  const required = validateRequired(value, 'Email');
  if (required) return required;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address.';
  return undefined;
}

export function validatePassword(value: string) {
  if (!value) return 'Password is required.';
  if (value.length < 6) return 'Password must be at least 6 characters.';
  return undefined;
}

export function validatePhone(value: string) {
  const required = validateRequired(value, 'Phone number');
  if (required) return required;
  if (!/^01[0-25]\d{8}$/.test(value.trim())) return 'Enter an Egyptian mobile number, e.g. 01012345678.';
  return undefined;
}

export function validateDescription(value: string) {
  const required = validateRequired(value, 'Description');
  if (required) return required;
  if (value.trim().length < 10) return 'Please write at least 10 characters.';
  return undefined;
}

export function validatePositiveNumber(value: string, fieldName: string) {
  const required = validateRequired(value, fieldName);
  if (required) return required;
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return `${fieldName} must be a number greater than 0.`;
  return undefined;
}
