/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * At least 6 characters
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Get password strength level
 */
export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (password.length < 6) return 'weak';
  
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;
  
  if (strength >= 3) return 'strong';
  if (strength >= 2) return 'medium';
  return 'weak';
}

/**
 * Validate credits price range
 */
export function isValidPrice(price: number, min: number, max: number): boolean {
  return price >= min && price <= max && Number.isInteger(price);
}

/**
 * Validate nickname
 */
export function isValidNickname(nickname: string): boolean {
  return nickname.length >= 2 && nickname.length <= 20;
}

/**
 * Validate username format
 * 3-20 characters, letters, numbers, and underscores only
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}
