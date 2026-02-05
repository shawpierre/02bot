export enum TransactionType {
  VIEW = 'view',
  RECHARGE = 'recharge'
}

export enum TransactionStatus {
  SUCCESS = 'success',
  FAILED = 'failed'
}

export interface Transaction {
  id: string;
  secret_id?: string;
  buyer_id: string;
  seller_id?: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  created_at: string;
}
