import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: (userData, token) => {
    console.log("Logget inn", userData);
    set({ user: userData, token });
  },
  logout: () => {
    console.log("Logging out");
    set({ user: null, token: null });
  },
}));
