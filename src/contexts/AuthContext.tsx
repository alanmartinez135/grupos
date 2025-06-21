
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, User } from '@/types';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string, role: 'teacher' | 'student') => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido como ${role === 'teacher' ? 'profesor' : 'alumno'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Credenciales inválidas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: 'teacher' | 'student') => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast({
        title: "Registro exitoso",
        description: `Cuenta creada como ${role === 'teacher' ? 'profesor' : 'alumno'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la cuenta",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
