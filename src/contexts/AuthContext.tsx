import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  fullName: string;
  email: string;
  faculty: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  pendingEmail: string | null;
  setPendingEmail: (email: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');

    if (!storedUser || !storedToken || storedUser === 'undefined' || storedUser === 'null') {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser && typeof parsedUser === 'object') {
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    } catch {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        pendingEmail,
        setPendingEmail,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
