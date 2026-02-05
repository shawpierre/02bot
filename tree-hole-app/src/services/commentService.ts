import { supabase } from './supabase';
import { Comment, CreateCommentDto } from '../types/comment';

export async function getCommentsBySecretId(secretId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('secret_id', secretId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get comments error:', error);
    return [];
  }

  return data || [];
}

export async function createComment(userId: string, dto: CreateCommentDto): Promise<Comment> {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      user_id: userId,
      secret_id: dto.secret_id,
      content: dto.content,
    })
    .select()
    .single();

  if (error) {
    console.error('Create comment error:', error);
    throw error;
  }

  // Increment comment count
  await supabase.rpc('increment_comment_count', { secret_id: dto.secret_id });

  return data;
}

export async function deleteComment(commentId: string, userId: string) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', userId);

  if (error) {
    console.error('Delete comment error:', error);
    throw error;
  }
}
