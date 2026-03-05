export interface LoginProps {
  apelid: string;
  setApelid: (value: string) => void;
  senha: string;
  setSenha: (value: string) => void;
  loading: boolean;
  handleLogin: (e: React.FormEvent) => Promise<void>;
}