import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../services/api';

export const useLogin = () => {
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userData = await authApi.login(apelido, senha);
      
      // Salva no LocalStorage para o Header/Sidebar lerem depois
      localStorage.setItem('@Baffs:user', JSON.stringify(userData));
      
      // Navega para a rota principal do Dashboard
      navigate('/menu'); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    apelido,
    setApelido,
    senha,
    setSenha,
    isLoading,
    error,
    handleLogin
  };
};