import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { anonymize } from '../../../utils/anonymize';
import { Logo } from '../../common/Logo/Logo';

export function Header() {
  const { user, signOut, isGuest, enterGuestMode, exitGuestMode } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  function handleGuestMode() {
    enterGuestMode();
    navigate('/listen');
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glassmorphism border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <FiBell className="w-5 h-5" />
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <FiUser className="w-5 h-5" />
                <span className="text-sm">{user?.nickname || 'momo'}</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-red-400"
              >
                <FiLogOut className="w-5 h-5" />
              </button>
            </div>
          ) : isGuest ? (
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 text-yellow-400 text-sm">
                游客模式
              </span>
              <Link
                to="/login"
                className="px-4 py-2 text-mystic-500 hover:text-mystic-400 transition-colors"
              >
                登录
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-mystic-500 hover:bg-mystic-600 rounded-lg transition-colors"
              >
                注册
              </Link>
              <button
                onClick={exitGuestMode}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                退出游客
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 text-mystic-500 hover:text-mystic-400 transition-colors"
              >
                登录
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-mystic-500 hover:bg-mystic-600 rounded-lg transition-colors"
              >
                注册
              </Link>
              <button
                onClick={handleGuestMode}
                className="px-4 py-2 border border-mystic-500 text-mystic-500 hover:bg-mystic-500/10 rounded-lg transition-colors"
              >
                游客浏览
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
