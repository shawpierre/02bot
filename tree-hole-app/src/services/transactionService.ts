import { supabase } from './supabase';
import { Transaction } from '../types/transaction';

export async function getTransactions(userId: string, limit = 20, offset = 0): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Get transactions error:', error);
    return [];
  }

  return data || [];
}

export async function createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select()
    .single();

  if (error) {
    console.error('Create transaction error:', error);
    throw error;
  }

  return data;
}
