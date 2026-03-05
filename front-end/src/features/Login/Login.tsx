import { motion } from 'framer-motion';
import logo from "../../assets/logobaffs.png";

const Login = () => {
  return (
    /* Fundo escuro base para o gradiente brilhar */
    <div className="min-h-screen w-full flex items-center justify-center bg-(--bg-base) overflow-hidden relative">
      
      {/* BACKGROUND LÍQUIDO ÓRGANICO: Formas abstratas flutuando e mudando de cor para simular líquido. */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-brand/60 rounded-full blur-[150px] opacity-70"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-125 h-125 bg-[#fb923c]/50 rounded-full blur-[130px] opacity-60"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute top-[40%] left-[30%] w-75 h-75 bg-[#78350f]/80 rounded-full blur-[110px] opacity-80"
        />
      </div>

      {/* CONTAINER DO CARD (Para centralizar e adicionar brilho ambiente) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md p-8 mx-4"
      >
        {/* SPECULAR GLOW: Um brilho laranja sutil *atrás* do card */}
        <div className="absolute inset-0 bg-brand/10 blur-[60px] rounded-[2.5rem]" />

        {/* APPLE LIQUID GLASS CARD: 
            backdrop-blur-3xl (Desfoque Máximo)
            rounded-[2.5rem] (Canto Suave 'Apple squircle')
            border (A borda SPECULAR HIGHLIGHT finíssima branca)
        */}
        <div className="backdrop-blur-3xl bg-surface-primary border border-system-border-default rounded-[2.5rem] p-10 flex flex-col items-center shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative">
          
          {/* O SEGREDO DO REALISMO: Uma borda interna extra finíssima no topo */}
          <div className="absolute top-0 left-10 right-10 h-px bg-white/20 blur-[0.5px]" />

          <div className="flex flex-col items-center justify-center gap-5 mb-12 w-full">
            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="p-1"
            >
              <img 
                src={logo} 
                alt="Logo BAFF's" 
                className="h-20 w-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
              />
            </motion.div>

            <div className="text-center">
              <h1 className="text-4xl text-brand font-black tracking-tighter shadow-sm">
                Pedidos
              </h1>
              <p className="text-system-text-muted mt-2 text-xs font-bold tracking-[0.3em] uppercase">
                Portal Administrativo
              </p>
            </div>
          </div>

          <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Input Glass (Levemente mais opaco que o card) */}
            <div className="space-y-2">
              <label className="text-system-text-secondary text-[11px] font-bold uppercase tracking-[0.25em] ml-3">
                Usuário
              </label>
              <input 
                type="text" 
                placeholder="DIGITE SEU USUÁRIO"
                className="w-full bg-surface-secondary border border-system-border-default/50 rounded-2xl px-5 py-4.5 text-system-text-primary placeholder:text-system-text-muted focus:outline-none focus:ring-1 focus:ring-brand/50 focus:bg-surface-secondary/50 transition-all outline-none text-sm tracking-wide"
              />
            </div>

            <div className="space-y-2">
              <label className="text-system-text-secondary text-[11px] font-bold uppercase tracking-[0.25em] ml-3">
                Senha
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-surface-secondary border border-system-border-default/50 rounded-2xl px-5 py-4.5 text-system-text-primary placeholder:text-system-text-muted focus:outline-none focus:ring-1 focus:ring-brand/50 focus:bg-surface-secondary/50 transition-all outline-none text-sm tracking-wide"
              />
            </div>

            {/* Botão Líquido (Sólido, mas com hover suave) */}
            <motion.button
              type="submit"
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 10px 30px rgba(249, 115, 22, 0.4)"
              }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-brand text-white font-extrabold py-4.5 rounded-2xl transition-all mt-4 cursor-pointer text-sm tracking-[0.15em] shadow-[0_4px_12px_rgba(249,115,22,0.2)]"
            >
              ENTRAR NO SISTEMA
            </motion.button>
            
            <div className="text-center pt-5">
               <a href="#" className="text-xs text-system-text-muted hover:text-white font-medium transition-colors">
                 Recuperar acesso? <span className="font-bold underline text-brand/70 hover:text-brand">Suporte</span>
               </a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;