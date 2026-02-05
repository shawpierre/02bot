import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components/common/Button/Button';
import { Container } from '../../components/layout/Container/Container';
import { createSecret } from '../../services/secretService';
import { validateContent } from '../../utils/contentFilter';
import { MAX_SECRET_LENGTH, MIN_PRICE, MAX_PRICE } from '../../utils/constants';
import { FiMessageCircle } from 'react-icons/fi';

export function ConfessPage() {
  const [content, setContent] = useState('');
  const [price, setPrice] = useState(10);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) {
      showToast('error', '请先登录');
      return;
    }

    const validation = validateContent(content, MAX_SECRET_LENGTH);
    if (!validation.valid) {
      showToast('error', validation.error || '内容验证失败');
      return;
    }

    setLoading(true);

    createSecret(user.id, { content, price })
      .then(() => {
        showToast('success', '秘密已发布到树洞');
        navigate('/');
      })
      .catch((error) => {
        showToast('error', '发布失败：' + (error.message || '请稍后重试'));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="glassmorphism rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <FiMessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">倾诉树洞</h1>
                <p className="text-gray-400 text-sm">在这里，秘密被温柔倾听</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  你的秘密
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="在这里倾诉你的秘密..."
                  className="w-full h-64 px-4 py-3 rounded-lg bg-forest-gray border border-forest-gray-light text-white placeholder-gray-500 focus:outline-none focus:border-mystic-500 focus:ring-1 focus:ring-mystic-500 transition-all resize-none"
                  maxLength={MAX_SECRET_LENGTH}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>{content.length} / {MAX_SECRET_LENGTH}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  设定点数价格
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="flex-1 h-2 bg-forest-gray rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="px-4 py-2 bg-mystic-500/20 rounded-lg text-mystic-500 font-bold min-w-[100px] text-center">
                    {price} 点数
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  当有人倾听你的秘密时，你将获得这些点数
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full py-4 text-lg"
              >
                发布到树洞
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
