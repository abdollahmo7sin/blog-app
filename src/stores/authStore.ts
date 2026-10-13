import { create } from "zustand"
import type { User } from "@supabase/supabase-js"

type AuthStore = {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoading: true,
    setUser: (user) => set({ user, isLoading: false }),
}));