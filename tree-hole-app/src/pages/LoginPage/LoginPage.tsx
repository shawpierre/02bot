import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components/common/Button/Button';
import { Input } from '../../components/common/Input/Input';
import { FiMail, FiLock } from 'react-icons/fi';
import { isValidEmail } from '../../utils/validators';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function validate() {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = '请输入邮箱';
    } else if (!isValidEmail(email)) {
      newErrors.email = '邮箱格式不正确';
    }

    if (!password) {
      newErrors.password = '请输入密码';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    
    signIn({ email, password })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        showToast('error', '登录失败：' + (error.message || '请检查邮箱和密码'));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="glassmorphism rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient mb-2">欢迎回来</h1>
            <p className="text-gray-400">登录进入神秘的树洞世界</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="邮箱"
              placeholder="请输入邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              icon={<FiMail />}
            />

            <Input
              type="password"
              label="密码"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              icon={<FiLock />}
            />

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full"
            >
              登录
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              还没有账号？{' '}
              <Link to="/register" className="text-mystic-500 hover:text-mystic-400 transition-colors">
                立即注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
