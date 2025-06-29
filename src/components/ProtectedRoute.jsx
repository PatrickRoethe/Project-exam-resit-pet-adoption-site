import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

// Wrapper for beskyttede ruter
export default function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  // Hvis ikke innlogget, redirect til login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Hvis innlogget, vis child-komponent (f.eks. Create/Edit)
  return children;
}
