import { Navigate, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const parseTokenExpiry = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

const clearAuth = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUsername");
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const expiry = token ? parseTokenExpiry(token) : null;
  const isExpired = !expiry || Date.now() >= expiry;

  useEffect(() => {
    if (!token || isExpired || !expiry) return;

    const delay = expiry - Date.now();
    const timer = setTimeout(() => {
      clearAuth();
      navigate("/login", { replace: true });
    }, delay);

    return () => clearTimeout(timer);
  }, [token, expiry, isExpired, navigate]);

  if (!token || isExpired) {
    clearAuth();
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
