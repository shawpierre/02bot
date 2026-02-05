import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from '../../components/layout/Container/Container';
import { FiMessageCircle, FiHeadphones, FiShield, FiHeart, FiTrendingUp } from 'react-icons/fi';
import { FireflyBackground } from '../../components/common/FireflyBackground/FireflyBackground';

export function HomePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* 夜晚森林背景 + 萤火虫 */}
          <FireflyBackground />

          <Container className="relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              在这里，秘密被
              <span className="text-gradient">温柔倾听</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              一个神秘的匿名树洞社交平台，倾诉你的秘密，倾听他人的故事
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-mystic-500 hover:bg-mystic-600 rounded-lg text-lg font-medium transition-all hover:shadow-[0_0_30px_rgba(45,212,191,0.5)]"
              >
                开始倾诉
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 border border-mystic-500 text-mystic-500 hover:bg-mystic-500/10 rounded-lg text-lg font-medium transition-all"
              >
                去倾听
              </Link>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <Container>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glassmorphism p-8 rounded-2xl text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-mystic-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShield className="w-8 h-8 text-mystic-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">匿名安全</h3>
                <p className="text-gray-400">
                  所有用户统一显示为"momo"，完全保护你的隐私
                </p>
              </div>

              <div className="glassmorphism p-8 rounded-2xl text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-mystic-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHeart className="w-8 h-8 text-mystic-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">情感连接</h3>
                <p className="text-gray-400">
                  随机发现他人的秘密，给予温暖的评论和支持
                </p>
              </div>

              <div className="glassmorphism p-8 rounded-2xl text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-mystic-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrendingUp className="w-8 h-8 text-mystic-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">积分红包</h3>
                <p className="text-gray-400">
                  通过虚拟积分系统，让倾诉获得温暖的回报
                </p>
              </div>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  // Logged in view
  return (
    <div className="min-h-screen pt-16 relative">
      {/* 登录后也保留背景效果（稍微降低透明度） */}
      <div className="absolute inset-0 opacity-30">
        <FireflyBackground />
      </div>
      
      <Container className="py-12 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          欢迎回到<span className="text-gradient">树洞世界</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            to="/confess"
            className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiMessageCircle className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">倾诉树洞</h2>
                <p className="text-gray-400 text-sm">分享你的秘密</p>
              </div>
            </div>
            <p className="text-gray-300">
              匿名倾诉你的秘密，设定点数价格，当有人倾听时获得温暖的回报
            </p>
          </Link>

          <Link
            to="/listen"
            className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiHeadphones className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">倾听树洞</h2>
                <p className="text-gray-400 text-sm">发现他人的故事</p>
              </div>
            </div>
            <p className="text-gray-300">
              随机发现一个树洞秘密，选择是否付费支持，给予温暖的评论
            </p>
          </Link>
        </div>
      </Container>
    </div>
  );
}
