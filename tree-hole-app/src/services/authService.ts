import { supabase } from './supabase';
import { User } from '../types/user';

export interface SignUpParams {
  email: string;
  password: string;
  nickname: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

/**
 * Sign up a new user
 */
export async function signUp({ email, password, nickname }: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
    },
  });

  if (error) {
    console.error('Sign up error:', error);
    throw error;
  }

  return data;
}

/**
 * Sign in an existing user
 */
export async function signIn({ email, password }: SignInParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    throw error;
  }

  return data;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

/**
 * Get current user session
 */
export async function getCurrentUser(): Promise<User | null> {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Get current user error:', error);
    return null;
  }

  if (!session?.user) {
    return null;
  }

  // Get user profile from public.users table
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (profileError) {
    console.error('Get user profile error:', profileError);
    return null;
  }

  return profile;
}

/**
 * Update user profile
 */
export async function updateProfile(nickname: string) {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('users')
    .update({ nickname })
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Update profile error:', error);
    throw error;
  }

  return data;
}
