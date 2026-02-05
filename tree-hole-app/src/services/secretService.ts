import { supabase } from './supabase';
import { Secret, CreateSecretDto } from '../types/secret';
import { PREVIEW_LENGTH } from '../utils/constants';
import { stories } from '../data/stories';

// Get a random secret from local stories data
export async function getRandomSecret(userId: string | null): Promise<Secret | null> {
  if (!stories || stories.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * stories.length);
  const story = stories[randomIndex];

  return {
    id: story.id,
    user_id: 'system',
    content: story.content,
    preview: story.preview,
    price: story.price,
    status: 'active',
    view_count: story.view_count,
    created_at: story.created_at,
    type: story.type
  };
}

export async function getSecretById(secretId: string): Promise<Secret | null> {
  const { data, error } = await supabase
    .from('secrets')
    .select('*')
    .eq('id', secretId)
    .single();

  if (error) {
    console.error('Get secret by id error:', error);
    return null;
  }

  return data;
}

export async function getMySecrets(userId: string): Promise<Secret[]> {
  const { data, error } = await supabase
    .from('secrets')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get my secrets error:', error);
    return [];
  }

  return data || [];
}

export async function getPurchasedSecrets(userId: string): Promise<Secret[]> {
  const { data, error } = await supabase
    .from('user_secret_views')
    .select(`
      secret_id,
      secrets (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get purchased secrets error:', error);
    return [];
  }

  return (data || [])
    .map((item: any) => item.secrets)
    .filter((secret): secret is Secret => secret !== null);
}
