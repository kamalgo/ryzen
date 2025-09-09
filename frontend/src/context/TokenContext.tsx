// frontend/src/context/TokenContext.tsx
//the token is stored in localStorage and reused automatically across all the pages (instead of always depending on ?token= in the URL)

import React, { createContext, useContext, useEffect, useState } from "react";

interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => {
    // try to read from localStorage on init
    return localStorage.getItem("authToken");
  });

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("authToken", newToken);
    } else {
      localStorage.removeItem("authToken");
    }
    setTokenState(newToken);
  };

  // capture ?token=... from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      // 🔹 optional: remove token from URL for cleanliness
      params.delete("token");
      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// 🔹 Hook for easy access
export function useToken() {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used inside TokenProvider");
  }
  return context;
}
