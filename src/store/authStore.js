import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: (userData, token) => {
    set({ user: userData, token });
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", token);
  },

  logout: () => {
    set({ user: null, token: null });
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  },

  initAuth: () => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    if (user && token) {
      set({ user: JSON.parse(user), token });
    }
  },
}));
