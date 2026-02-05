export interface Comment {
  id: string;
  secret_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface CreateCommentDto {
  secret_id: string;
  content: string;
}

export interface CommentWithUser extends Comment {
  user?: {
    id: string;
    nickname: string;
  };
}
