import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { extractUserFromToken, isTokenExpired } from '../utils/jwt';
import { authApi, ApiError } from '../services/api';

const TOKEN_KEY = 'pp_token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken]   = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser]     = useState(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    return t && !isTokenExpired(t) ? extractUserFromToken(t) : null;
  });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // Auto-logout on token expiry
  useEffect(() => {
    if (!token) return;
    if (isTokenExpired(token)) { logout(); return; }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const ms = payload.exp * 1000 - Date.now();
    const timer = setTimeout(logout, ms);
    return () => clearTimeout(timer);
  }, [token]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.login(email, password);
      if (!res.success) throw new Error(res.message || 'Login failed.');
      localStorage.setItem(TOKEN_KEY, res.token);
      setToken(res.token);
      setUser(extractUserFromToken(res.token));
      return { success: true };
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : (err.message || 'Login failed. Please try again.');
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const isLicenseActive = user?.license?.isActive ?? false;

  return (
    <AuthContext.Provider value={{ token, user, loading, error, login, logout, clearError, isLicenseActive }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
