import React, { useState } from 'react';
import { Button } from '../../common/Button/Button';
import { MAX_COMMENT_LENGTH } from '../../../utils/constants';
import { FiSend } from 'react-icons/fi';

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim()) return;

    setLoading(true);
    await onSubmit(content);
    setContent('');
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="glassmorphism rounded-lg p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="写下你的评论..."
        className="w-full h-24 px-4 py-3 rounded-lg bg-forest-gray border border-forest-gray-light text-white placeholder-gray-500 focus:outline-none focus:border-mystic-500 focus:ring-1 focus:ring-mystic-500 transition-all resize-none mb-3"
        maxLength={MAX_COMMENT_LENGTH}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          {content.length} / {MAX_COMMENT_LENGTH}
        </span>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={!content.trim()}
        >
          <FiSend className="w-4 h-4 mr-2" />
          发表评论
        </Button>
      </div>
    </form>
  );
}
