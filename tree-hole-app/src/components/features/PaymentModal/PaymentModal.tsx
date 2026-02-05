import React, { useState } from 'react';
import { Button } from '../../common/Button/Button';
import { FiX, FiDollarSign } from 'react-icons/fi';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  price: number;
  preview: string;
}

export function PaymentModal({ isOpen, onClose, onConfirm, price, preview }: PaymentModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleConfirm() {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative glassmorphism rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-mystic-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiDollarSign className="w-8 h-8 text-mystic-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">确认解锁</h2>
          <p className="text-gray-400">
            消耗点数查看完整秘密
          </p>
        </div>

        <div className="bg-forest-gray rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-400 mb-2">秘密预览</p>
          <p className="text-white">{preview}</p>
        </div>

        <div className="flex items-center justify-between p-4 bg-mystic-500/10 rounded-lg mb-6">
          <span className="text-gray-300">需要支付</span>
          <span className="text-2xl font-bold text-mystic-500">{price} 点数</span>
        </div>

        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            取消
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            className="flex-1"
            loading={loading}
          >
            确认支付
          </Button>
        </div>
      </div>
    </div>
  );
}
