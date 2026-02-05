import { supabase } from './supabase';
import { Wallet } from '../types/wallet';

export async function getWallet(userId: string): Promise<Wallet | null> {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Get wallet error:', error);
    return null;
  }

  return data;
}

export async function updateBalance(userId: string, amount: number) {
  const { data, error } = await supabase.rpc('update_wallet_balance', {
    p_user_id: userId,
    p_amount: amount,
  });

  if (error) {
    console.error('Update balance error:', error);
    throw error;
  }

  return data;
}

export async function recharge(userId: string, amount: number) {
  const { data: wallet, error: walletError } = await supabase
    .from('wallets')
    .select('balance, total_income')
    .eq('user_id', userId)
    .single();

  if (walletError) throw walletError;

  const newBalance = wallet.balance + amount;
  const newTotalIncome = wallet.total_income + amount;

  const { error: updateError } = await supabase
    .from('wallets')
    .update({
      balance: newBalance,
      total_income: newTotalIncome,
    })
    .eq('user_id', userId);

  if (updateError) throw updateError;

  // Create transaction record
  const { error: txError } = await supabase
    .from('transactions')
    .insert({
      buyer_id: userId,
      amount,
      type: 'recharge',
      status: 'success',
    });

  if (txError) throw txError;
}
