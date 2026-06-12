import { create } from "zustand";
import { User } from "@/types";
import { getAuth, saveAuth, clearAuth } from "@/lib/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  initialize: () => {
    const { isAuthenticated, user } = getAuth();
    set({ isAuthenticated, user, isLoading: false });
  },

  login: (user: User) => {
    saveAuth(user);
    set({ isAuthenticated: true, user, isLoading: false });
  },

  logout: () => {
    clearAuth();
    set({ isAuthenticated: false, user: null, isLoading: false });
  },
}));
