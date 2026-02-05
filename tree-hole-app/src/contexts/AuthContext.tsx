import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Load user on mount
  useEffect(() => {
    loadUser();

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await loadUser();
        setIsGuest(false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function loadUser() {
    setLoading(true);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }

  async function handleSignUp(params: SignUpParams) {
    setLoading(true);
    await signUp(params);
    await loadUser();
    showToast('success', '注册成功！欢迎来到树洞');
    setLoading(false);
  }

  async function handleSignIn(params: SignInParams) {
    setLoading(true);
    await signIn(params);
    await loadUser();
    showToast('success', '登录成功！');
    setLoading(false);
  }

  async function handleSignOut() {
    setLoading(true);
    await signOut();
    setUser(null);
    setIsGuest(false);
    showToast('info', '已退出登录');
    setLoading(false);
  }

  function enterGuestMode() {
    setIsGuest(true);
    sessionStorage.setItem('guest_mode', 'true');
    showToast('info', '已进入游客模式，无法获得点数');
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
    setLoading(true);
    await updateProfile(nickname);
    await loadUser();
    showToast('success', '昵称已更新');
    setLoading(false);
  }

  async function refreshUser() {
    await loadUser();
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
