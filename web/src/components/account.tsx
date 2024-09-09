import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { api } from "../services/api";
import { toast } from "sonner";


export function Account() {

  const { userEmail, userName, userCPF, getUserInfo } = useAuth();

  const userIdLocalStorage = localStorage.getItem('user-id');

  // Estados para os inputs
  const [name, setName] = useState(userName || '');
  const [email, setEmail] = useState(userEmail || '');
  const [cpf, setCpf] = useState(userCPF || '');

  // Estados para armazenar os valores originais
  const [originalName, setOriginalName] = useState(userName || '');
  const [originalEmail, setOriginalEmail] = useState(userEmail || '');
  const [originalCpf, setOriginalCpf] = useState(userCPF || '');

  // Atualiza os estados quando as informações do usuário são carregadas
  useEffect(() => {
    if (userIdLocalStorage) {
      getUserInfo(Number(userIdLocalStorage));
    }
  }, [userIdLocalStorage]);

  useEffect(() => {
    setName(userName || '');
    setEmail(userEmail || '');
    setCpf(userCPF || '');

    // Armazenando valores originais para comparação posterior
    setOriginalName(userName || '');
    setOriginalEmail(userEmail || '');
    setOriginalCpf(userCPF || '');
  }, [userName, userEmail, userCPF]);

  const handleUpdate = async () => {
    if (!userIdLocalStorage) {
      toast.error('ID do usuário não encontrado.');
      return;
    }

    const userId = Number(userIdLocalStorage);

    // Construir o payload com apenas os campos modificados
    const updatedFields: { name?: string; email?: string; cpf?: string } = {};
    if (name !== originalName) updatedFields.name = name;
    if (email !== originalEmail) updatedFields.email = email;
    if (cpf !== originalCpf) updatedFields.cpf = cpf;

    // Verificar se há campos modificados antes de enviar a requisição
    if (Object.keys(updatedFields).length === 0) {
      toast.info('Nenhuma alteração foi feita.');
      return;
    }

    const accessToken = localStorage.getItem('token-validate');

    // Verifica se o token existe antes de fazer a requisição
    if (!accessToken) {
      console.error('Access token is not available');
      toast.error("Token de acesso não disponível.");
      return; // Retorna para evitar a requisição sem token
    }

    try {
      await api.put(`/users/${userId}`, updatedFields, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success('Informações atualizadas com sucesso!');

      // Atualiza o localStorage e os estados
      localStorage.setItem('user-name', name);
      localStorage.setItem('user-email', email);
      localStorage.setItem('user-cpf', cpf);
    } catch (error) {
      console.error('Erro ao atualizar as informações do usuário:', error);
      toast.error('Erro ao atualizar as informações do usuário.');
    }
  };


  return (
    <div className="flex flex-col items-center justify-center mt-28 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-3/4 md:w-1/2 lg:w-1/3 p-6">
        <h2 className="text-2xl font-raleway-bold mb-4 text-center text-black">Informações da Conta</h2>
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 font-inter font-medium text-sm">Nome</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-700 font-inter font-medium text-sm">Email</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-700 font-inter font-medium text-sm">CPF</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="bg-green-medium hover:bg-[#6C9965] text-white py-2 px-12 rounded-xl"
            onClick={handleUpdate}
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  )
}