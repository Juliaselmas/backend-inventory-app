import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: null,
  loading: false,
  setToken: (token) => {},
  logOut: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Funktion för att sätta token (eller user)
  const setToken = (token) => {
    setUser({ token });
    localStorage.setItem("@library/token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("@library/token");
  };

  useEffect(() => {
    const token = localStorage.getItem("@library/token");
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  console.log({ user, setToken, logout, loading });

  return (
    <AuthContext.Provider value={{ user, setToken, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
