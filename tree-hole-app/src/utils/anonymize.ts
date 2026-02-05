/**
 * Anonymize username for privacy protection
 * All usernames will be displayed as "momo"
 */
export function anonymize(nickname?: string): string {
  return 'momo';
}

/**
 * Check if a user should see their real nickname
 * (e.g., in profile edit page)
 */
export function shouldShowRealName(context: 'profile-edit' | 'display'): boolean {
  return context === 'profile-edit';
}
