import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useWallet } from '../../contexts/WalletContext';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components/common/Button/Button';
import { Container } from '../../components/layout/Container/Container';
import { PaymentModal } from '../../components/features/PaymentModal/PaymentModal';
import { Loading } from '../../components/common/Loading/Loading';
import { getRandomSecret, getSecretById } from '../../services/secretService';
import { processPayment } from '../../services/paymentService';
import { Secret } from '../../types/secret';
import { FiHeadphones, FiRefreshCw } from 'react-icons/fi';

export function ListenPage() {
  const [secret, setSecret] = useState<Secret | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const { user, isGuest } = useAuth();
  const { wallet, refetch: refetchWallet } = useWallet();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadRandomSecret();
  }, [user]);

  async function loadRandomSecret() {
    setLoading(true);
    const randomSecret = await getRandomSecret(null);
    setSecret(randomSecret);
    setLoading(false);
  }

  async function handlePayment() {
    if (isGuest) {
      showToast('info', '游客无法支付，请登录后体验完整功能');
      navigate('/login');
      return;
    }

    if (!user || !secret || !wallet) return;

    if (wallet.balance < secret.price) {
      showToast('error', '点数余额不足，请先充值');
      return;
    }

    const result = await processPayment({
      secretId: secret.id,
      buyerId: user.id,
      sellerId: secret.user_id,
      amount: secret.price,
    });

    if (result.success) {
      showToast('success', '支付成功！');
      setShowPaymentModal(false);
      await refetchWallet();
      navigate(`/secret/${secret.id}`);
    } else {
      showToast('error', result.error || '支付失败');
    }
  }

  if (loading) {
    return <Loading fullscreen text="正在寻找树洞..." />;
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <FiHeadphones className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">倾听树洞</h1>
              <p className="text-gray-400 text-sm">随机发现一个秘密</p>
            </div>
          </div>

          {secret ? (
            <div className="glassmorphism rounded-2xl p-8 shadow-lg">
              <div className="mb-6">
                <p className="text-lg text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">
                  {secret.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>作者：momo</span>
                  <span>{secret.view_count} 人倾听</span>
                </div>
              </div>

              {isGuest ? (
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    onClick={loadRandomSecret}
                    className="flex-1"
                  >
                    <FiRefreshCw className="w-5 h-5 mr-2" />
                    换一个
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/login')}
                    className="flex-1"
                  >
                    登录后打赏
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between p-4 bg-mystic-500/10 rounded-lg mb-6">
                    <span className="text-gray-300">打赏作者</span>
                    <span className="text-xl font-bold text-mystic-500">{secret.price} 点数</span>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="ghost"
                      onClick={loadRandomSecret}
                      className="flex-1"
                    >
                      <FiRefreshCw className="w-5 h-5 mr-2" />
                      换一个
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setShowPaymentModal(true)}
                      className="flex-1"
                    >
                      打赏查看
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="glassmorphism rounded-2xl p-12 text-center shadow-lg">
              <div className="text-6xl mb-4">🌙</div>
              <h2 className="text-2xl font-bold mb-2">暂无新树洞</h2>
              <p className="text-gray-400 mb-6">
                所有秘密都已被你倾听过了，稍后再来看看吧
              </p>
              <Button variant="primary" onClick={loadRandomSecret}>
                <FiRefreshCw className="w-5 h-5 mr-2" />
                刷新试试
              </Button>
            </div>
          )}
        </div>
      </Container>

      {secret && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handlePayment}
          price={secret.price}
          preview={secret.preview}
        />
      )}
    </div>
  );
}
