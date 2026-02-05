import { supabase } from './supabase';
import { User } from '../types/user';

export interface SignUpParams {
  username: string;
  email?: string;
  password: string;
  nickname: string;
}

export interface SignInParams {
  username: string;
  password: string;
}

export interface SignUpByEmailParams {
  email: string;
  password: string;
  nickname: string;
}

/**
 * Sign up a new user with username
 */
export async function signUp({ username, email, password, nickname }: SignUpParams) {
  // Check if username already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .maybeSingle();

  if (existingUser) {
    throw new Error('用户名已被占用，请尝试其他用户名');
  }

  // Create auth user with email (or dummy email if not provided)
  const authEmail = email || `${username}@temp.local`;
  
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: authEmail,
    password,
    options: {
      data: {
        username,
        nickname,
      },
    },
  });

  if (authError) {
    console.error('Sign up error:', authError);
    throw authError;
  }

  // Create user profile in users table
  const { error: profileError } = await supabase
    .from('users')
    .insert({
      id: authData.user?.id,
      username,
      nickname,
      email: email || null,
    });

  if (profileError) {
    console.error('Create profile error:', profileError);
    // Try to delete the auth user if profile creation failed
    if (authData.user) {
      try {
        await supabase.auth.admin.deleteUser(authData.user.id);
      } catch (e) {
        console.error('Failed to delete auth user:', e);
      }
    }
    throw new Error('创建用户信息失败');
  }

  return authData;
}

/**
 * Sign in with username and password
 */
export async function signIn({ username, password }: SignInParams) {
  // First, find the user by username to get their email
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id, username, email')
    .eq('username', username)
    .maybeSingle();

  if (userError) {
    console.error('Find user error:', userError);
    throw new Error('查询用户失败，请稍后重试');
  }

  if (!user) {
    throw new Error('用户名不存在');
  }

  // Use the email to sign in with Supabase auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email || `${user.username}@temp.local`,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    throw error;
  }

  return data;
}

/**
 * Sign in with email (alternative method)
 */
export async function signInWithEmail({ email, password }: { email: string; password: string }) {
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

/**
 * Check if username is available
 */
export async function checkUsernameAvailable(username: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .single();

  return !data && !error;
}
