import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';
import { supabase } from '../services/supabase';
import { signUp, signIn, signOut, getCurrentUser, updateProfile, SignUpParams, SignInParams } from '../services/authService';
import { useToast } from './ToastContext';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  signUp: (params: SignUpParams) => Promise<void>;
  signIn: (params: SignInParams) => Promise<void>;
  signOut: () => Promise<void>;
  enterGuestMode: () => void;
  exitGuestMode: () => void;
  updateProfile: (nickname: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const isInitialLoad = useRef(true);

  // Load user on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
        isInitialLoad.current = false;
      }
    };

    loadUserData();

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Only handle auth state change if not initial load
        if (!isInitialLoad.current) {
          try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            console.error('Error loading user on auth change:', error);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignUp(params: SignUpParams) {
    try {
      setLoading(true);
      await signUp(params);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      showToast('success', '注册成功！欢迎来到树洞');
      navigate('/');
    } catch (error: any) {
      console.error('Sign up error:', error);
      showToast('error', error.message || '注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignIn(params: SignInParams) {
    try {
      setLoading(true);
      await signIn(params);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      showToast('success', '登录成功！');
      navigate('/');
    } catch (error: any) {
      console.error('Sign in error:', error);
      showToast('error', error.message || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      setLoading(true);
      await signOut();
      setUser(null);
      setIsGuest(false);
      showToast('info', '已退出登录');
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  }

  function enterGuestMode() {
    setIsGuest(true);
    sessionStorage.setItem('guest_mode', 'true');
    showToast('info', '已进入游客模式，无法获得点数');
    navigate('/listen');
  }

  function exitGuestMode() {
    setIsGuest(false);
    sessionStorage.removeItem('guest_mode');
    navigate('/login');
  }

  useEffect(() => {
    const guestMode = sessionStorage.getItem('guest_mode');
    if (guestMode === 'true') {
      setIsGuest(true);
    }
  }, []);

  async function handleUpdateProfile(nickname: string) {
    try {
      setLoading(true);
      await updateProfile(nickname);
      await loadUserData();
      showToast('success', '昵称已更新');
    } catch (error: any) {
      console.error('Update profile error:', error);
      showToast('error', error.message || '更新失败');
    } finally {
      setLoading(false);
    }
  }

  async function loadUserData() {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  }

  async function refreshUser() {
    await loadUserData();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isGuest,
        signUp: handleSignUp,
        signIn: handleSignIn,
        signOut: handleSignOut,
        enterGuestMode,
        exitGuestMode,
        updateProfile: handleUpdateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
