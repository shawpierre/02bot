import { supabase } from './supabase';
import { Secret, CreateSecretDto } from '../types/secret';
import { PREVIEW_LENGTH } from '../utils/constants';

export async function createSecret(userId: string, dto: CreateSecretDto): Promise<Secret> {
  const preview = dto.content.length > PREVIEW_LENGTH
    ? dto.content.substring(0, PREVIEW_LENGTH) + '...'
    : dto.content;

  const { data, error } = await supabase
    .from('secrets')
    .insert({
      user_id: userId,
      content: dto.content,
      preview,
      price: dto.price,
      status: 'active',
    })
    .select()
    .single();

  if (error) {
    console.error('Create secret error:', error);
    throw error;
  }

  return data;
}

export async function getRandomSecret(userId: string | null): Promise<Secret | null> {
  const { data, error } = await supabase
    .from('secrets')
    .select('*')
    .eq('status', 'active');

  if (error) {
    console.error('Get random secret error:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  // Pick a random one from the results
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
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
