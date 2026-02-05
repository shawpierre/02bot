import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useWallet } from '../../contexts/WalletContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Container } from '../../components/layout/Container/Container';
import { Button } from '../../components/common/Button/Button';
import { Loading } from '../../components/common/Loading/Loading';
import { formatCredits } from '../../utils/formatters';
import { FiUser, FiDollarSign, FiMessageCircle, FiHeadphones, FiBell } from 'react-icons/fi';

export function ProfilePage() {
  const { user } = useAuth();
  const { wallet, loading: walletLoading } = useWallet();
  const { unreadCount } = useNotification();

  if (walletLoading) {
    return <Loading fullscreen />;
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* User Info */}
          <div className="glassmorphism rounded-2xl p-8 mb-6 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-mystic-500/20 rounded-full flex items-center justify-center">
                <FiUser className="w-10 h-10 text-mystic-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.nickname || 'momo'}</h1>
                <p className="text-gray-400 text-sm">@{user?.username || 'unknown'}</p>
              </div>
            </div>
          </div>

          {/* Wallet Panel */}
          {wallet && (
            <div className="glassmorphism rounded-2xl p-8 mb-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FiDollarSign />
                我的钱包
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-mystic-500/10 rounded-lg p-6">
                  <p className="text-sm text-gray-400 mb-2">余额</p>
                  <p className="text-3xl font-bold text-mystic-500">
                    {formatCredits(wallet.balance)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">点数</p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-6">
                  <p className="text-sm text-gray-400 mb-2">总收益</p>
                  <p className="text-3xl font-bold text-green-500">
                    {formatCredits(wallet.total_income)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">点数</p>
                </div>
                <div className="bg-red-500/10 rounded-lg p-6">
                  <p className="text-sm text-gray-400 mb-2">总支出</p>
                  <p className="text-3xl font-bold text-red-500">
                    {formatCredits(wallet.total_expense)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">点数</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glassmorphism rounded-xl p-6 hover:scale-105 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <FiMessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="font-bold">我的倾诉</h3>
              </div>
              <p className="text-sm text-gray-400">查看发布的树洞</p>
            </div>

            <div className="glassmorphism rounded-xl p-6 hover:scale-105 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <FiHeadphones className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-bold">我的倾听</h3>
              </div>
              <p className="text-sm text-gray-400">查看购买的树洞</p>
            </div>

            <div className="glassmorphism rounded-xl p-6 hover:scale-105 transition-all cursor-pointer relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <FiBell className="w-5 h-5 text-yellow-500" />
                </div>
                <h3 className="font-bold">通知中心</h3>
                {unreadCount > 0 && (
                  <span className="absolute top-4 right-4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs">
                    {unreadCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400">查看评论通知</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
