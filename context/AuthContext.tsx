import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthProvider = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProps {
  children: ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <AuthProvider.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthProvider.Provider>
  );
}
