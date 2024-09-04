import  { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { api } from '../services/api';
import { jwtDecode } from 'jwt-decode';



interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getUserInfo: (sub: number) => void
  userEmail: string | null;
  userName: string | null;
  userId: number | null;
  userCPF: string | null
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userCPF, setUserCPF] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
  
  async function getUserInfo(sub: number) {
    try {
      const response = await api.get(`/users/${sub}`);
      const userInfo = response.data;
      
      localStorage.setItem('user-name', userInfo.name);
      localStorage.setItem('user-email', userInfo.email);
      localStorage.setItem('user-cpf', userInfo.cpf);
      	
        setUserEmail(userInfo.email);
        setUserName(userInfo.name);
        setUserCPF(userInfo.cpf);
        setUserId(sub)
  
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }


  async function login(email: string, password: string) {
    
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      const token = response.data.access_token;
  
      localStorage.setItem("token-validate", token);
      
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

      if(userId){
        localStorage.setItem("user-id", userId);
      }
      
      getUserInfo(Number(userId));
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
    <AuthContext.Provider value={{ login, logout, getUserInfo, userEmail, userName, userId, userCPF }}>
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
