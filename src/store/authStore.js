import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  apiKey: null,
  isAuthReady: false, // <-- NY

  login: (userData, token, apiKey) => {
    set({ user: userData, token, apiKey, isAuthReady: true });
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("apiKey", apiKey);
  },

  logout: () => {
    set({ user: null, token: null, apiKey: null, isAuthReady: false });
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("apiKey");
  },

  initAuth: () => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    const apiKey = sessionStorage.getItem("apiKey");
    if (user && token && apiKey) {
      set({ user: JSON.parse(user), token, apiKey, isAuthReady: true });
    } else {
      set({ isAuthReady: true }); // Viktig! Selv om bruker ikke er logget inn
    }
  },
}));
