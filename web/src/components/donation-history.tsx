import { CircleCheck, Coins, Info, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "sonner";

interface DonationHistoryProps {
  sendSelectDate: string;
}

interface Donation {
  id: number;
  data: string;
  pontos_gerados: number;
  status: number;
  user: {
    name: string;
    email: string;
    cpf: string | null;
  };
}


// Interface para o objeto "Doacao"
interface Doacao {
  id: number;
  data: string;
  doador_id: number;
  pontos_gerados: number;
  status: number;
  banco_de_alimento_id: number;
  created_at: string;
  updated_at: string;
  origem: string;
  deleted_at: string | null;
}

// Interface para o objeto "Item"
interface Item {
  id: number;
  doacao_id: number;
  produto_id: number;
  quantidade: number;
  pontos_gerados_item: number;
  created_at: string;
  updated_at: string;
  unidade_de_medida: string;
  pastaDeFotos: string;
  classificacao_id: number;
  classificacao_tipo: string;
}

// Interface para o objeto "Produto"
interface Produto {
  id: number;
  nome_produto: string;
  preco_dia: number;
  created_at: string;
  updated_at: string;
  pastaDeFotos: string;
}

// Interface para o retorno completo da requisição
interface DoacaoResponse {
  doacao: Doacao;
  itens: {
    item: Item;
    produto: Produto;
  }[];
}

export function DonationHistory({
  sendSelectDate,
}: DonationHistoryProps) {

  const [donations, setDonations] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [donationDetails, setDonationDetails] = useState<DoacaoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const fetchDonations = async () => {
    setIsLoading(true);

    const accessToken = localStorage.getItem('token-validate');

    // Verifica se o token existe antes de fazer a requisição
    if (!accessToken) {
      console.error('Access token is not available');
      setIsLoading(false);
      return; // Opcional: pode lançar um erro ou tratar de outra forma
    }

    try {
      const response = await api.post("/doacoes-filtro-data", { data: sendSelectDate }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDonations(response.data);
    } catch (error) {
      console.error("Erro ao buscar as doações:", error);
      toast.error('Erro ao carregar doações');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [sendSelectDate]);


  const closeInfoModal = () => {
    setSelectedDonation(null);
  };

  async function getTableDonation(id: number, donation: Donation) {
    setSelectedDonation(donation);
    setIsLoading(true); // Inicia o estado de carregamento

    const accessToken = localStorage.getItem('token-validate');

    // Verifica se o token existe antes de fazer a requisição
    if (!accessToken) {
      console.error('Access token is not available');
      setIsLoading(false); // Para o carregamento em caso de erro
      return; // Retorna para evitar a requisição sem token
    }

    try {
      const response = await api.get<DoacaoResponse>(`/doacoes-itens/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDonationDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar informações da tabela:", error);
    } finally {
      setIsLoading(false); // Para o carregamento após a requisição ser concluída
    }
  }


  const changeDonationStatus = async (id: number, status: number) => {
    const accessToken = localStorage.getItem('token-validate');

    // Verifica se o token existe antes de fazer a requisição
    if (!accessToken) {
      console.error('Access token is not available');
      toast.error("Erro de autenticação. Por favor, faça login novamente.");
      return; // Retorna para evitar a requisição sem token
    }

    try {
      await api.post(
        "/doacoes-mudar-status",
        { id, status },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (status === 1) {
        toast.success("Doação confirmada com sucesso");
      } else {
        toast.info("A doação selecionada foi negada");
      }

      fetchDonations(); // Recarrega a lista de doações
    } catch (error) {
      console.error("Erro ao mudar o status da doação:", error);
      toast.error("Erro ao mudar o status da doação");
    }
  };



  return (
    <div className="py-6 sm:py-9 px-4 sm:px-6 md:px-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl md:text-2xl font-raleway-bold">Histórico de doações</h2>
        <button className="bg-green-medium hover:bg-[#6C9965] text-white text-sm font-raleway-semibold tracking-tight py-3 px-3 rounded-lg w-fit">
          Gerar relatório
        </button>
      </div>
      <div className="max-h-72 tall:max-h-[480px] overflow-y-auto">
        <ul className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-3">
              <div className="loader border-t-4 border-green-medium rounded-full w-8 h-8 animate-spin"></div>
            </div>
          ) : (
            <>
              {donations.map((donation) => (
                <li
                  key={donation.id}
                  className="flex justify-between items-center bg-white p-4 rounded shadow"
                >
                  <div className="flex items-center space-x-4">
                    <Info
                      className="text-green-medium hover:text-[#6B9864] cursor-pointer"
                      onClick={() => getTableDonation(donation.id, donation)}
                    />
                    <div>
                      <div className="font-semibold">{donation.user.name}</div>
                      <div className="text-gray-500">CPF: {donation.user.cpf}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button>
                      {donation.status === 1 ? (
                        <CircleCheck className="text-green-medium hover:text-[#6B9864] w-8 h-8" />
                      ) : (
                        <CircleCheck
                          className="text-gray-400 hover:text-gray-500 w-8 h-8"
                          onClick={() => changeDonationStatus(donation.id, 1)}
                        />
                      )}
                    </button>
                    <button>
                      <Trash2
                        className="text-red-500 hover:text-red-600"
                        onClick={() => changeDonationStatus(donation.id, 2)}
                      />
                    </button>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      {/* Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Informações da doação</h2>
                <button>
                  <X className="size-5 text-zinc-400 hover:text-zinc-600" onClick={closeInfoModal} />
                </button>
              </div>
              <div className="flex gap-4">
                <p className="font-inter font-medium text-sm">Nome: {selectedDonation.user.name}</p>
                <p className="font-inter font-medium text-sm">CPF: {selectedDonation.user.cpf || "N/A"}</p>
                <p className="font-inter font-medium text-sm">Email: {selectedDonation.user.email}</p>
              </div>

              {/* Table */}
              <div className="overflow-y-auto max-h-72">
                {isLoading ? ( // Condicional para exibir o carregamento
                  <div className="flex items-center justify-center py-10">
                    <div className="loader border-t-4  border-green-medium rounded-full w-8 h-8 animate-spin"></div>
                  </div>
                ) : (
                  <table className="min-w-full bg-white rounded-lg border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 text-left text-sm font-medium text-gray-700">Alimento</th>
                        <th className="py-3 text-left text-sm font-medium text-gray-700">Quantidade</th>
                        <th className="py-3 text-left text-sm font-medium text-gray-700">Qualidade</th>
                        <th className="py-3 text-left text-sm font-medium text-gray-700">Preço(kg)</th>
                        <th className="py-3 text-left text-sm font-medium text-gray-700">Total(R$)</th>
                        <th className="py-3 text-left text-sm font-medium text-gray-700 flex gap-1">
                          Pontos <Coins />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {donationDetails?.itens.map(({ item, produto }, index) => (
                        <tr key={item.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                          <td className="py-4 whitespace-nowrap">{produto.nome_produto}</td>
                          <td className="py-4 whitespace-nowrap">{item.quantidade}</td>
                          <td className="py-4 whitespace-nowrap">{item.classificacao_tipo}</td>
                          <td className="py-4 whitespace-nowrap">{produto.preco_dia}</td>
                          <td className="py-4 whitespace-nowrap">{(produto.preco_dia * item.quantidade).toFixed(2)}</td>
                          <td className="py-4 whitespace-nowrap">{item.pontos_gerados_item}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {/* Final da Tabela */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
