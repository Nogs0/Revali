import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { api } from '../services/api';


interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
 

  async function login(email: string, password: string) {
    
    try {
      const response = await api.post('/login', {
        email,
        password,
      });
  
      localStorage.setItem("token-validate", response.data.access_token)
      toast.success('Login feito com sucesso!');
      
    } catch (error: any) {
        console.error('Login failed:', error);
        toast.error('E-mail ou senha inválidos.');
        logout();
    }
  };

  function logout() {
    localStorage.clear()
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
