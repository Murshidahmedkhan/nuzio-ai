import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginRequest, logoutRequest, meRequest, registerRequest } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [preference, setPreference] = useState(null);
  const [loading, setLoading] = useState(true);

  const restore = async () => {
    try {
      const { data } = await meRequest();
      setUser(data.user);
      setPreference(data.preference || null);
      return data;
    } catch {
      setUser(null);
      setPreference(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restore();
  }, []);

  const login = async (payload) => {
    await loginRequest(payload);
    return restore();
  };

  const register = async (payload) => {
    await registerRequest(payload);
    return restore();
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
    setPreference(null);
  };

  const value = useMemo(
    () => ({
      user,
      preference,
      setPreference,
      loading,
      login,
      register,
      logout,
      restore,
    }),
    [user, preference, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
