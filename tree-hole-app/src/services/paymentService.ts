import { supabase } from './supabase';

export interface PaymentParams {
  secretId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

/**
 * Process complete payment flow
 * 1. Verify buyer's balance
 * 2. Deduct from buyer's wallet
 * 3. Add to seller's wallet
 * 4. Create transaction record
 * 5. Record view history
 */
export async function processPayment(params: PaymentParams): Promise<PaymentResult> {
  const { secretId, buyerId, sellerId, amount } = params;

  // 1. Check buyer's balance
  const { data: buyerWallet, error: buyerError } = await supabase
    .from('wallets')
    .select('balance')
    .eq('user_id', buyerId)
    .single();

  if (buyerError || !buyerWallet) {
    return { success: false, error: '获取钱包信息失败' };
  }

  if (buyerWallet.balance < amount) {
    return { success: false, error: '积分余额不足' };
  }

  // 2. Deduct from buyer
  const newBuyerBalance = buyerWallet.balance - amount;
  const { error: deductError } = await supabase
    .from('wallets')
    .update({
      balance: newBuyerBalance,
      total_expense: buyerWallet.balance + amount,
    })
    .eq('user_id', buyerId);

  if (deductError) {
    console.error('Deduct error:', deductError);
    return { success: false, error: '扣款失败' };
  }

  // 3. Add to seller
  const { data: sellerWallet, error: sellerWalletError } = await supabase
    .from('wallets')
    .select('balance, total_income')
    .eq('user_id', sellerId)
    .single();

  if (sellerWalletError || !sellerWallet) {
    console.error('Get seller wallet error:', sellerWalletError);
    return { success: false, error: '获取卖家钱包失败' };
  }

  const { error: addError } = await supabase
    .from('wallets')
    .update({
      balance: sellerWallet.balance + amount,
      total_income: sellerWallet.total_income + amount,
    })
    .eq('user_id', sellerId);

  if (addError) {
    console.error('Add to seller error:', addError);
    return { success: false, error: '转账失败' };
  }

  // 4. Update secret income and view count
  const { data: currentSecret, error: getSecretError } = await supabase
    .from('secrets')
    .select('income, view_count')
    .eq('id', secretId)
    .single();

  if (getSecretError || !currentSecret) {
    console.error('Get secret error:', getSecretError);
  } else {
    const { error: secretError } = await supabase
      .from('secrets')
      .update({
        income: currentSecret.income + amount,
        view_count: currentSecret.view_count + 1,
      })
      .eq('id', secretId);

    if (secretError) {
      console.error('Update secret error:', secretError);
    }
  }

  // 5. Create transaction record
  const { data: transaction, error: txError } = await supabase
    .from('transactions')
    .insert({
      secret_id: secretId,
      buyer_id: buyerId,
      seller_id: sellerId,
      amount,
      type: 'view',
      status: 'success',
    })
    .select()
    .single();

  if (txError) {
    console.error('Create transaction error:', txError);
    return { success: false, error: '创建交易记录失败' };
  }

  // 6. Record view history
  const { error: viewError } = await supabase
    .from('user_secret_views')
    .insert({
      user_id: buyerId,
      secret_id: secretId,
    });

  if (viewError) {
    console.error('Record view history error:', viewError);
  }

  return { success: true, transactionId: transaction.id };
}
