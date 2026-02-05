import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Container } from '../../components/layout/Container/Container';
import { CommentList } from '../../components/features/CommentList/CommentList';
import { CommentForm } from '../../components/features/CommentForm/CommentForm';
import { Loading } from '../../components/common/Loading/Loading';
import { getSecretById } from '../../services/secretService';
import { getCommentsBySecretId, createComment } from '../../services/commentService';
import { createNotification } from '../../services/notificationService';
import { Secret } from '../../types/secret';
import { Comment } from '../../types/comment';
import { anonymize } from '../../utils/anonymize';
import { formatRelativeTime } from '../../utils/formatters';
import { validateContent } from '../../utils/contentFilter';
import { MAX_COMMENT_LENGTH } from '../../utils/constants';
import { FiMessageCircle, FiEye } from 'react-icons/fi';

export function SecretDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [secret, setSecret] = useState<Secret | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  async function loadData() {
    if (!id) return;

    setLoading(true);
    const [secretData, commentsData] = await Promise.all([
      getSecretById(id),
      getCommentsBySecretId(id),
    ]);

    setSecret(secretData);
    setComments(commentsData);
    setLoading(false);
  }

  async function handleCommentSubmit(content: string) {
    if (!user || !secret) return;

    const validation = validateContent(content, MAX_COMMENT_LENGTH);
    if (!validation.valid) {
      showToast('error', validation.error || '评论验证失败');
      return;
    }

    const comment = await createComment(user.id, {
      secret_id: secret.id,
      content,
    });

    // Create notification for secret owner
    if (secret.user_id !== user.id) {
      await createNotification(
        secret.user_id,
        secret.id,
        comment.id,
        `${anonymize()} 评论了你的树洞`
      );
    }

    showToast('success', '评论成功');
    await loadData();
  }

  if (loading) {
    return <Loading fullscreen />;
  }

  if (!secret) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">找不到这个树洞</h2>
          <button
            onClick={() => navigate('/')}
            className="text-mystic-500 hover:text-mystic-400"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <Container>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Secret Content */}
          <div className="glassmorphism rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-mystic-500/20 rounded-full flex items-center justify-center">
                <span className="text-mystic-500 font-bold">M</span>
              </div>
              <div>
                <p className="font-medium">{anonymize()}</p>
                <p className="text-sm text-gray-400">
                  {formatRelativeTime(secret.created_at)}
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-200 leading-relaxed mb-6 whitespace-pre-wrap">
              {secret.content}
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <FiEye />
                {secret.view_count} 次倾听
              </span>
              <span className="flex items-center gap-2">
                <FiMessageCircle />
                {secret.comment_count} 条评论
              </span>
              <span className="text-mystic-500 font-medium">
                {secret.price} 点数
              </span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FiMessageCircle />
              评论 ({comments.length})
            </h2>

            {user && <CommentForm onSubmit={handleCommentSubmit} />}

            <CommentList comments={comments} />
          </div>
        </div>
      </Container>
    </div>
  );
}
