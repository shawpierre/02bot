import React from 'react';
import { Comment } from '../../../types/comment';
import { anonymize } from '../../../utils/anonymize';
import { formatRelativeTime } from '../../../utils/formatters';

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        还没有评论，来第一个评论吧
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="glassmorphism rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-mystic-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-mystic-500 font-bold">M</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-white">{anonymize()}</span>
                <span className="text-xs text-gray-500">
                  {formatRelativeTime(comment.created_at)}
                </span>
              </div>
              <p className="text-gray-300">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
