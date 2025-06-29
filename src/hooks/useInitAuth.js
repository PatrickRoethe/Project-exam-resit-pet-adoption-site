import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export function useInitAuth() {
  useEffect(() => {
    useAuthStore.getState().initAuth();
  }, []);
}
