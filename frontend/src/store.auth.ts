// import { create } from "zustand";

// type User = {
//   id: string;
//   name: string;
//   email?: string;
//   mobile?: string;
// };

// type AuthState = {
//   user: User | null;
//   login: (user: User) => void;
//   logout: () => void;
// };

// export const useAuth = create<AuthState>((set) => ({
//   user: null,
//   login: (user) => set({ user }),
//   logout: () => set({ user: null }),
// }));

// store.auth.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name?: string;
  email?: string;
  mobile?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "maha_auth", // key in localStorage
    }
  )
);
