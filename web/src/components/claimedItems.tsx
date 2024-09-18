import { CircleCheckBig, XCircle } from "lucide-react";
import { useQuery } from "react-query";
import { toast } from "sonner";
import { useState } from "react";
import { getDonator } from "../http/get-donator";
import { api } from "../services/api";
import { ResgateData } from "../models/ClaimedItemsModel";


export function ClaimedItems() {

    const [selectDonator, setSelectDonator] = useState<string>("");
    const [items, setItems] = useState<ResgateData[] | null>(null);
    const [isItemsLoading, setIsItemsLoading] = useState(false);
    const [isItemsError, setIsItemsError] = useState(false);

    const { data: donatorData, isError: isDonatorError, isLoading: isDonatorLoading } = useQuery("donator-list", getDonator);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectDonator(event.target.value); // valor já será string
        const donatorId = Number(event.target.value); // Converte para número ao chamar a função
        if (donatorId) {
            fetchItemsNotClaimedYet(donatorId, null);
        }
    };

    const fetchItemsNotClaimedYet = async (doador_id: number, filter: number | null) => {
        const accessToken = localStorage.getItem('token-validate');
        if (!accessToken) {
            toast.error('Erro de autenticação. Por favor, faça login novamente.');
            return;
        }

        try {
            setIsItemsLoading(true);
            setIsItemsError(false);

            const response = await api.post<ResgateData[]>('/itens-resgate-nao-resgatados', { doador_id }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            let filteredItems = response.data;

            // Aplicar o filtro "Dentro do prazo" ou "Fora do prazo"
            if (filter !== null) {
                filteredItems = filteredItems.filter(item => item.item_resgate["7_dias_ou_mais"] === filter);
            }

            setItems(filteredItems); // Define os itens filtrados

        } catch (error) {
            setIsItemsError(true);
            toast.error('Erro ao carregar os itens não resgatados');
        } finally {
            setIsItemsLoading(false);
        }
    };

    const changeClaimedItemsStatus = async (id: number, foi_resgatado: number) => {
        const accessToken = localStorage.getItem('token-validate');
        if (!accessToken) {
            toast.error('Erro de autenticação. Por favor, faça login novamente.');
            return;
        }

        try {
            const response = await api.post(
                "/itens-resgate-mudar-status",
                { id, foi_resgatado },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.data.foi_resgatado === 1) {
                toast.success("Item resgatado com sucesso");
            }

            if (response.data.foi_resgatado === 2) {
                toast.success("Regaste foi estornado com sucesso");
            }

            if (selectDonator) {
                fetchItemsNotClaimedYet(Number(selectDonator), null); // Refaz a requisição após mudar o status
            }

        } catch (error) {
            toast.error("Erro ao mudar status");
        }
    };


    return (
        <div className="py-6 sm:py-9 px-4 sm:px-6 md:px-12">
            <div className="flex items-center gap-5 ">
                <h2 className="text-xl md:text-2xl font-raleway-bold mb-4">Produtos para serem resgatados</h2>
                <button
                    className="bg-green-medium hover:bg-[#6C9965] text-white text-sm font-raleway-semibold tracking-tight py-2 px-3 rounded-3xl mt-[-10px]"
                    onClick={() => {
                        fetchItemsNotClaimedYet(Number(selectDonator), 0); // Chama a função com filtro "Dentro do prazo"
                    }}
                >
                    Dentro do prazo
                </button>
                <button
                    className="bg-green-medium hover:bg-[#6C9965] text-white text-sm font-raleway-semibold tracking-tight py-2 px-3 rounded-3xl mt-[-10px]"
                    onClick={() => {
                        fetchItemsNotClaimedYet(Number(selectDonator), 1); // Chama a função com filtro "Fora do prazo"
                    }}
                >
                    Fora do prazo
                </button>
            </div>
            <select
                className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2 mb-10"
                value={selectDonator}
                onChange={handleSelectChange}
            >
                <option value="">Selecione um doador</option>
                {isDonatorLoading && <option value="">Carregando...</option>}
                {isDonatorError && <option value="">Ocorreu um erro!</option>}
                {donatorData?.map((donator) => (
                    <option key={donator.id} value={donator.id.toString()}>{donator.user.name}</option>
                ))}

            </select>
            {isItemsLoading ? (
                <div className="flex items-center justify-center py-3">
                    <div className="loader border-t-4 border-green-medium rounded-full w-8 h-8 animate-spin"></div>
                </div>
            ) : isItemsError ? (
                <p className="text-red-500">Erro ao carregar os itens</p>
            ) : (
                <div className="max-h-72 tall:max-h-[480px] overflow-y-auto">
                    <ul className="space-y-4">
                        {items?.map((item) => (
                            <li
                                key={item.item_resgate.id}
                                className="flex items-center justify-between bg-white p-4 rounded shadow w-full min-h-[120px] max-h-[200px]"
                            >
                                <div className="flex items-center space-x-4 w-full">
                                    <img
                                        src={item.item_resgate.pastaDeFotos}
                                        alt="foto_items_para_resgate"
                                        className="w-20 h-24 object-cover rounded"
                                    />
                                    <div className="flex flex-col justify-between flex-grow">
                                        <div className="font-semibold">{item.item_resgate.nome}</div>
                                        <div className="text-gray-500">Quantidade: x{item.item_resgate.quantidade}</div>
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow">
                                        {item.item_resgate["7_dias_ou_mais"] === 0 ? (
                                            <h3 className="text-green-medium font-raleway-semibold">Resgate dentro do prazo</h3>
                                        ) : (
                                            <h3 className="text-red-400 font-raleway-semibold">Resgate fora do prazo</h3>
                                        )
                                        }

                                    </div>
                                    <div className="flex flex-col justify-between text-right">
                                        <div className="font-semibold">{item.doador.nome}</div>
                                        <div className="text-gray-500">{item.doador.email}</div>
                                    </div>
                                    <div>
                                        <button className={`${item.item_resgate["7_dias_ou_mais"] === 0 ? 'mr-4' : 'mr-0'}`}>
                                            <CircleCheckBig
                                                className="text-green-medium hover:text-[#6B9864] w-8 h-8"
                                                onClick={() => changeClaimedItemsStatus(item.item_resgate.id, 1)}
                                            />
                                        </button>
                                    </div>
                                    {item.item_resgate["7_dias_ou_mais"] === 1 && (
                                        <div>
                                            <button className="mr-4">
                                                <XCircle
                                                    className="text-red-500 hover:text-red-600 w-8 h-8"
                                                    onClick={() => changeClaimedItemsStatus(item.item_resgate.id, 2)}
                                                />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}