import { useState, useEffect } from "react";

export const useHeader = () => {
  const [userName, setUserName] = useState<string>("Usuário");

  useEffect(() => {
    const storedUser = localStorage.getItem("@Baffs:user");
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // Pegamos apenas o primeiro nome para ficar mais elegante no design
        const firstName = user.nome.split(" ")[0];
        setUserName(firstName);
      } catch (error) {
        console.error("Erro ao ler dados do usuário", error);
      }
    }
  }, []);

  return { userName };
};