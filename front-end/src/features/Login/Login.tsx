import { AnimatePresence, motion } from 'framer-motion';
import logo from "../../assets/logobaffs.png";
import { useLogin } from './hooks/useLogin';

const Login = () => {
  const { apelido, setApelido, senha, setSenha, isLoading, error, handleLogin } = useLogin();
  
  return (
    /* SOLUÇÃO PARA O FUNDO BRANCO:
       1. Adicionamos 'dark' para os filhos usarem as variáveis escuras.
       2. style={{ backgroundColor: '#000000' }} é a força bruta contra o CSS global.
       3. h-screen w-screen garante que cubra tudo.
    */
    <div 
      className="dark h-screen w-screen flex items-center justify-center overflow-hidden relative"
      style={{ backgroundColor: '#000000' }} 
    >
      
      {/* BACKGROUND LÍQUIDO ÓRGANICO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-brand/40 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-125 h-125 bg-orange-500/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute top-[40%] left-[30%] w-75 h-75 bg-amber-900/60 rounded-full blur-[90px]"
        />
      </div>

      {/* CONTAINER DO CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-6"
      >
        {/* Efeito de brilho externo ao card */}
        <div className="absolute inset-0 bg-brand/5 blur-[100px] rounded-full" />

        {/* APPLE LIQUID GLASS CARD */}
        <div className="backdrop-blur-3xl bg-white/3 border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center shadow-2xl relative overflow-hidden">
          
          {/* Brilho na borda superior (Realismo Apple) */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          {/* Header do Card */}
          <div className="flex flex-col items-center justify-center gap-4 mb-10 w-full">
            <motion.img 
              src={logo} 
              alt="Logo BAFF's" 
              initial={{ filter: "brightness(1)" }}
              whileHover={{ filter: "brightness(1.2)" }}
              className="h-16 md:h-20 w-auto object-contain drop-shadow-2xl" 
            />
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl text-white font-black tracking-tighter">
                Pedidos
              </h1>
              <p className="text-white/40 mt-1 text-[10px] font-bold tracking-[0.4em] uppercase">
                Portal Administrativo
              </p>
            </div>
          </div>

          <form className="w-full space-y-5" onSubmit={handleLogin}>
            {/* Input Usuário */}
            <div className="space-y-1.5">
              <label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] ml-4">
                Usuário
              </label>
              <input 
                type="text" 
                value={apelido}
                onChange={(e) => setApelido(e.target.value)}
                placeholder="Identificação"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:border-brand/50 focus:bg-white/8 transition-all outline-none text-sm"
              />
            </div>

            {/* Input Senha */}
            <div className="space-y-1.5">
              <label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] ml-4">
                Senha
              </label>
              <input 
                type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:border-brand/50 focus:bg-white/8 transition-all outline-none text-sm"
              />
            </div>

            {/* Erro Animado */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-red-400 text-[11px] font-bold text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botão Principal */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02, backgroundColor: 'var(--brand-primary-hover)' }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-brand text-white font-black py-4 md:py-5 rounded-2xl mt-4 cursor-pointer text-xs tracking-[0.2em] transition-all shadow-lg
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-brand/20'}
              `}
            >
              {isLoading ? 'VERIFICANDO...' : 'ENTRAR NO SISTEMA'}
            </motion.button>
          </form>
          
          <span className="mt-8 text-[10px] text-white/20 font-medium uppercase tracking-widest">
            versão beta • Orange Custom Systems
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;