import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components/common/Button/Button';
import { Input } from '../../components/common/Input/Input';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { isValidPassword, isValidNickname, isValidUsername } from '../../utils/validators';

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    nickname?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  
  const { signUp } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function validate() {
    const newErrors: typeof errors = {};

    if (!username) {
      newErrors.username = '请输入用户名';
    } else if (!isValidUsername(username)) {
      newErrors.username = '用户名需3-20位字母、数字或下划线';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '邮箱格式不正确';
    }

    if (!nickname) {
      newErrors.nickname = '请输入昵称';
    } else if (!isValidNickname(nickname)) {
      newErrors.nickname = '昵称长度需在2-20字符之间';
    }

    if (!password) {
      newErrors.password = '请输入密码';
    } else if (!isValidPassword(password)) {
      newErrors.password = '密码长度至少6位';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    
    signUp({ username, email: email || undefined, password, nickname })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        showToast('error', '注册失败：' + (error.message || '请稍后重试'));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const passwordStrength = password ? (password.length < 6 ? 'weak' : password.length < 10 ? 'medium' : 'strong') : null;
  const strengthColor: Record<string, string> = {
    weak: 'text-red-500',
    medium: 'text-yellow-500',
    strong: 'text-green-500',
  };
  const strengthText: Record<string, string> = {
    weak: '弱',
    medium: '中',
    strong: '强',
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="glassmorphism rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient mb-2">加入树洞</h1>
            <p className="text-gray-400">在这里，秘密被温柔倾听</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="用户名"
              placeholder="设置用户名（3-20位）"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              icon={<FiUser />}
            />

            <Input
              type="text"
              label="昵称"
              placeholder="设置昵称（2-20位）"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              error={errors.nickname}
            />

            <Input
              type="email"
              label="邮箱（选填）"
              placeholder="用于找回账号"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              icon={<FiMail />}
            />

            <div>
              <Input
                type="password"
                label="密码"
                placeholder="请输入密码（至少6位）"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                icon={<FiLock />}
              />
              {passwordStrength && (
                <p className={`mt-1 text-sm ${strengthColor[passwordStrength]}`}>
                  密码强度：{strengthText[passwordStrength]}
                </p>
              )}
            </div>

            <Input
              type="password"
              label="确认密码"
              placeholder="请再次输入密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              icon={<FiLock />}
            />

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full"
            >
              注册
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              已有账号？{' '}
              <Link to="/login" className="text-mystic-500 hover:text-mystic-400 transition-colors">
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
