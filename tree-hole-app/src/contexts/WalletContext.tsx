import React, { createContext, useContext, useState, useEffect } from 'react';
import { Wallet } from '../types/wallet';
import { getWallet, recharge } from '../services/walletService';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';

interface WalletContextValue {
  wallet: Wallet | null;
  loading: boolean;
  refetch: () => Promise<void>;
  recharge: (amount: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadWallet();
      
      // Subscribe to wallet changes
      const channel = supabase
        .channel('wallet-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'wallets',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            loadWallet();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setWallet(null);
      setLoading(false);
    }
  }, [user]);

  async function loadWallet() {
    if (!user) return;

    setLoading(true);
    const walletData = await getWallet(user.id);
    setWallet(walletData);
    setLoading(false);
  }

  async function handleRecharge(amount: number) {
    if (!user) throw new Error('Not authenticated');

    await recharge(user.id, amount);
    await loadWallet();
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        loading,
        refetch: loadWallet,
        recharge: handleRecharge,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}
