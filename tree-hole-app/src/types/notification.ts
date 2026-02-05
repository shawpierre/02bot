export enum NotificationType {
  COMMENT = 'comment',
  SYSTEM = 'system'
}

export interface Notification {
  id: string;
  user_id: string;
  secret_id: string;
  comment_id?: string;
  type: NotificationType;
  content: string;
  is_read: boolean;
  created_at: string;
}
