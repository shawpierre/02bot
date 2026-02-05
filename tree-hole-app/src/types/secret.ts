export interface Secret {
  id: string;
  user_id: string;
  content: string;
  preview: string;
  price: number;
  view_count: number;
  comment_count: number;
  income: number;
  status: 'active' | 'deleted';
  created_at: string;
  type?: string;
}

export interface CreateSecretDto {
  content: string;
  price: number;
}

export interface SecretWithUser extends Secret {
  user?: {
    id: string;
    nickname: string;
  };
}
