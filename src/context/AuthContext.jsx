import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = authService.onChange(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const r = await authService.getRole(firebaseUser.uid);
        setRole(r);
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const isAdmin = !!user && role === "admin";

  return (
    <AuthContext.Provider value={{ user, role, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
