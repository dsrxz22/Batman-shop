import { create } from 'zustand';
import { User, AuthSession } from '@/types';

interface AuthStore {
  session: AuthSession;
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSession: (session: AuthSession) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: { user: null, loading: false },
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSession: (session) => set({ session }),
  logout: () => set({ user: null, session: { user: null, loading: false } }),
}));
