import { supabase } from './supabase';
import { Notification, NotificationType } from '../types/notification';

export async function getNotifications(userId: string): Promise<Notification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get notifications error:', error);
    return [];
  }

  return data || [];
}

export async function markAsRead(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) {
    console.error('Mark notification as read error:', error);
    throw error;
  }
}

export async function markAllAsRead(userId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  if (error) {
    console.error('Mark all notifications as read error:', error);
    throw error;
  }
}

export async function createNotification(
  userId: string,
  secretId: string,
  commentId: string,
  content: string
) {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      secret_id: secretId,
      comment_id: commentId,
      type: NotificationType.COMMENT,
      content,
      is_read: false,
    })
    .select()
    .single();

  if (error) {
    console.error('Create notification error:', error);
    throw error;
  }

  return data;
}
