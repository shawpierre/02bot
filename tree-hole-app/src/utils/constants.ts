// Price Range (Credits)
export const MIN_PRICE = 1;
export const MAX_PRICE = 100;

// Content Length Limits
export const MAX_SECRET_LENGTH = 500;
export const MAX_COMMENT_LENGTH = 200;
export const PREVIEW_LENGTH = 50;

// Status Enums
export const SecretStatus = {
  ACTIVE: 'active',
  DELETED: 'deleted',
} as const;

export const TransactionType = {
  VIEW: 'view',
  RECHARGE: 'recharge',
} as const;

export const TransactionStatus = {
  SUCCESS: 'success',
  FAILED: 'failed',
} as const;

export const NotificationType = {
  COMMENT: 'comment',
  SYSTEM: 'system',
} as const;

// Initial Credits for New Users
export const INITIAL_CREDITS = 100;

// Pagination
export const PAGE_SIZE = 20;
