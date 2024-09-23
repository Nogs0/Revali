import { ArrowRightToLine, Check, Trash2, X } from "lucide-react";
import { useState } from "react";
import InputMask from 'react-input-mask';

import { getProduct } from "../http/get-product";
import { useQuery, useQueryClient } from "react-query";
import { getClassification } from "../http/get-classification";
import { api } from "../services/api";
import { toast } from "sonner";
import { registerUser } from "../http/create-newUser";
import { getDonator } from "../http/get-donator";

export function DonationForm() {

    interface Item {
        nome_produto: string;
        quantidade: string;
        qualidade: string;
        preco: string;
        pontos: string;
        total: number;
        produto_id: number;
        classificacoes_id: number;

    }

    const [newUserModal, setNewUserModal] = useState(false);
    const [newUserInformationModal, setNewUserInformationModal] = useState(false);
    const [newEmailUser, setNewEmailUser] = useState<string | undefined>('');
    const [newPasswordUser, setNewPasswordUser] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newUserCPF, setNewUserCPF] = useState('');
    const [selectDonator, setSelectDonator] = useState("");
    const [selectProduct, setSelectProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [value, setValue] = useState("");
    const [selectClassification, setSelectClassification] = useState("");

    const queryClient = useQueryClient();

    const { data: donatorData, isError: isDonatorError, isLoading: isDonatorLoading, refetch } = useQuery("donator-list", getDonator);
    const { data: productData, isError: isProductError, isLoading: isProductLoading } = useQuery("products-list", getProduct);
    const { data: classificationData, isError: isClassificationError, isLoading: isClassificationLoading } = useQuery("classification-list", getClassification);


    const [items, setItems] = useState<Item[]>([]);

    function openNewUserModal() {
        setNewUserModal(true)
    }

    function closeNewUserModal() {
        setNewUserModal(false)
    }

    function openNewUserInformationModal() {
        setNewUserInformationModal(true)
    }

    function closeNewUserInformationModal() {
        setNewUserInformationModal(false)
    }


    const handleSelectChange = (event: any) => {
        const value = event.target.value
        setSelectDonator(value)

    }

    const handleSelectProduct = (event: any) => {
        const value = event.target.value
        setSelectProduct(value)
    }

    const handleSelectClassification = (event: any) => {
        const value = event.target.value
        setSelectClassification(value)

    }


    const handleInputQuantity = (event: any) => {
        let inputValue = event.target.value;

        inputValue = inputValue.replace(/\D/g, '');

        if (inputValue === '') {
            setQuantity('');
            return;
        }

        let formattedValue;

        if (inputValue.length === 1) {
            formattedValue = `${inputValue}`;
        } else if (inputValue.length === 2) {
            formattedValue = `${inputValue[0]},${inputValue[1]}`;
        } else {
            const integerPart = inputValue.slice(0, -1);
            const decimalPart = inputValue.slice(-1);
            formattedValue = `${integerPart},${decimalPart}`; 
        }

        // Adiciona " kg" no final
        setQuantity(`${formattedValue}`);
    }

    const handleInputValue = (event: any) => {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, '');

        const numericValue = (parseFloat(inputValue) / 100).toFixed(2);

        const formattedValue = new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            minimumFractionDigits: 2,
        }).format(parseFloat(numericValue));

        // Atualiza o estado com o valor formatado
        setValue(formattedValue);

    }

    const handleRemoveDonation = (index: number) => {
        const donationsRows = items.filter((_, x) => x !== index)

        setItems(donationsRows)
    };

    const handleSubmit = async () => {
        let produtos = [] as any
        items.map((x) => {
            produtos.push({ produto_id: x.produto_id, quantidade: Number(x.quantidade), classificacoes_id: x.classificacoes_id })
        })

        const banco_alimentos_id = localStorage.getItem('banco-alimentos-id');

        try {
            await api.post("/salvar-doacao", {
                data: new Date().toISOString().split("T")[0],
                doador_id: Number(selectDonator),
                banco_de_alimento_id: Number(banco_alimentos_id),
                produtos: produtos
            });
            toast.success('Doação feita com sucesso');
            setItems([]);
            setSelectDonator('');
            setSelectProduct('');
            setQuantity('');
            setValue('');
            setSelectClassification('');
        } catch (error) {
            toast.error('Ocorreu um erro no processo de doação');
        }

    };

    const updateValue = async () => {
        const productInfo = productData?.find((x) => parseInt(x.id) === parseInt(selectProduct));

        if (productInfo) {
            const itemId = productInfo.id;

            const numericValue = Number(value.replace(/\./g, '').replace(',', '.'));

            const dadosAtualizados = {
                preco_dia: numericValue
            };

            // Recuperar o token do localStorage
            const accessToken = localStorage.getItem('token-validate');

            if (!accessToken) {
                toast.error("Token de acesso não encontrado.");
                return; // Retorna se o token não estiver disponível
            }

            try {
                // Fazendo a requisição PUT com axios
                await api.put(`/produtos/${itemId}`, dadosAtualizados, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                toast.success("Preço atualizado com sucesso!");

                await queryClient.invalidateQueries(['products-list']);
            } catch (error) {
                toast.error("Houve um erro ao cadastrar o preço");
            }
        } else {
            toast.error("Selecione um produto para atualizar o preço");
        }
    };


    const handleNewUserName = (event: any) => {
        const value = event.target.value
        setNewUserName(value)
    }

    const handleNewUserCPF = (event: any) => {
        const value = event.target.value
        setNewUserCPF(value)
    }

    const handleSubmitNewUser = async (event: any) => {
        event.preventDefault();

        try {
            const response = await registerUser(newUserName, newUserCPF);
            closeNewUserModal(); // Fecha o modal após a submissão bem-sucedida
            setNewEmailUser(response?.email);
            setNewPasswordUser(response?.senha);
            openNewUserInformationModal();
            refetch();
        } catch (error) {
            console.error('Erro ao cadastrar o novo usuário:', error);
        }

    }

    const handleAddTable = () => {
        let tableItems = [] as any[];
    
        // Encontre as informações do produto selecionado
        const productInfo = productData?.find((x) => parseFloat(x.id) === parseFloat(selectProduct));
    
        // Encontre as informações da classificação selecionada
        const classificationInfo = classificationData?.find((x) => x.id === parseInt(selectClassification));
    
        if (productInfo && classificationInfo) {
            // Converte preco_dia para centavos para evitar imprecisões de ponto flutuante
            const priceInCents = Math.round(parseFloat(productInfo.preco_dia) * 100);
            const numericQuantity = Math.round(Number(quantity.replace(/\./g, '').replace(',', '.')) * 100);
            
            // Multiplica quantidade e preço
            const totalInCents = numericQuantity * priceInCents;
            const multiplicador = parseFloat(classificationInfo.multiplicador);
    
            // Calcula os pontos e converte o total para formato em reais (centavos)
            const pontos = Math.round((totalInCents * multiplicador) / 100);
            const total = totalInCents / 10000; // Para voltar o valor em reais com duas casas decimais
    
            tableItems.push({
                produto_id: productInfo.id,
                classificacoes_id: classificationInfo.id,
                nome_produto: productInfo.nome_produto,
                quantidade: numericQuantity / 100, // volta a quantidade ao valor original
                qualidade: classificationInfo.tipo,
                preco: productInfo.preco_dia,
                pontos: pontos,
                total: total.toFixed(2), // garante duas casas decimais
            });
    
            // Atualiza o estado usando a cópia do array existente
            setItems((prevItems) => [...prevItems, ...tableItems]);
        }
    };
    

    return (

        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-center">
                <div>
                    <label className="block text-black font-inter font-medium text-sm">Nome do doador<span className="text-red-500">*</span></label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={selectDonator}
                        onChange={handleSelectChange}
                    >
                        <option value="">Selecione um doador</option>
                        {isDonatorLoading && <option value="">Carregando...</option>}
                        {isDonatorError && <option value="">Ocorreu um erro!</option>}
                        {donatorData?.map((donator) => (
                            <option key={donator.id} value={donator.id}>{donator.user.name}</option>
                        ))}

                    </select>
                </div>
                <div className="flex flex-col">
                    <button onClick={openNewUserModal} className="bg-green-medium hover:bg-[#6C9965] text-white text-sm font-raleway-semibold tracking-tight py-3 px-3 mt-6 rounded w-fit">
                        Adicionar novo doador
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 items-center">
                <div className="flex-1">
                    <label className="block text-black font-inter font-medium text-sm mb-1">Alimentos a serem doados<span className="text-red-500">*</span></label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={selectProduct}
                        onChange={handleSelectProduct}
                    >
                        <option value="">Selecione um alimento</option>
                        {isProductLoading && <option value="">Carregando...</option>}
                        {isProductError && <option value="">Ocorreu um erro!</option>}
                        {productData?.map((product) => (
                            <option key={product.id} value={product.id}>{product.nome_produto}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-black font-inter font-medium text-sm mb-1">Quantidade(kg)<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="Digite a quantidade"
                        value={quantity}
                        onChange={handleInputQuantity}
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-black font-inter font-medium text-sm mb-1">Qualidade<span className="text-red-500">*</span></label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={selectClassification}
                        onChange={handleSelectClassification}
                    >
                        <option value="">Selecione a qualidade</option>
                        {isClassificationLoading && <option value="">Carregando...</option>}
                        {isClassificationError && <option value="">Ocorreu um erro!</option>}
                        {classificationData?.map((classification) => (
                            <option key={classification.id} value={classification.id}>{classification.tipo}</option>
                        ))}
                    </select>
                </div>


                <div>
                    <label className="block text-black font-inter font-medium text-sm mb-1">Preço(kg)<span className="text-zinc-300"> - Opcional</span></label>
                    <input
                        type="text"
                        placeholder="Digite o preço atualizado"
                        value={value}
                        onChange={handleInputValue}
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                    />
                </div>

                <div className="mt-6">
                    <button
                        className="bg-green-medium hover:bg-[#6C9965] text-white  py-2 px-4 rounded text-sm font-raleway-semibold tracking-tight"
                        onClick={updateValue}
                    >
                        Atualizar preço
                    </button>
                </div>

                <div>
                    <button
                        className="bg-green-medium hover:bg-[#6C9965] text-white  py-2 px-4 rounded"
                        onClick={handleAddTable}
                    >
                        <Check />
                    </button>
                </div>
            </div>



            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Alimento</th>
                            <th className="px-4 py-2 border">Quantidade</th>
                            <th className="px-4 py-2 border">Qualidade</th>
                            <th className="px-4 py-2 border">Preço(kg)</th>
                            <th className="px-4 py-2 border">Total(R$)</th>
                            <th className="px-4 py-2 border">Pontos</th>
                            <th className="px-4 py-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                <td className="px-4 py-2 border">{item.nome_produto}</td>
                                <td className="px-4 py-2 border">{item.quantidade}</td>
                                <td className="px-4 py-2 border">{item.qualidade}</td>
                                <td className="px-4 py-2 border">{item.preco}</td>
                                <td className="px-4 py-2 border">{item.total}</td>
                                <td className="px-4 py-2 border">{item.pontos}</td>
                                <td className="px-4 py-2 border text-center">
                                    <button
                                        onClick={() => handleRemoveDonation(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end mt-6">
                <button
                    className="bg-green-medium hover:bg-[#6C9965] text-white p-3 rounded flex items-center space-x-2 gap-2 text-sm font-raleway-semibold tracking-tight"
                    onClick={handleSubmit}
                >
                    Confirmar Doação
                    <ArrowRightToLine />
                </button>
            </div>

            {newUserModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-[586px] rounded-xl py-5 px-6 shadow-shape bg-zinc-100 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold mb-4">Novo doador</h2>
                                <button onClick={closeNewUserModal}>
                                    <X className="size-5 text-zinc-400 hover:text-zinc-500" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmitNewUser} autoComplete="off" className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nome Completo"
                                    required
                                    onChange={handleNewUserName}
                                    className="px-4 py-3 border rounded outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                                />
                                <InputMask
                                    mask="999.999.999-99"
                                    type="text"
                                    placeholder="CPF"
                                    required
                                    onChange={handleNewUserCPF}
                                    className="px-4 py-3 border rounded outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                                />
                                <button
                                    type="submit"
                                    className="mt-6 bg-green-medium hover:bg-[#6C9965] text-white py-3 rounded flex justify-center items-center text-sm font-raleway-semibold tracking-tight"

                                >
                                    Cadastrar <ArrowRightToLine className="ml-2" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {newUserInformationModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-[586px] rounded-xl py-5 px-6 shadow-shape bg-zinc-100 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold mb-4">Informações sobre a conta criada</h2>
                                <button onClick={closeNewUserInformationModal}>
                                    <X className="size-5 text-zinc-400 hover:text-zinc-500" />
                                </button>
                            </div>
                            <div className="flex flex-col gap-3 items-center">
                                <span className="font-raleway-semibold">Login: {newEmailUser}</span>
                                <span className="font-raleway-semibold">Senha: {newPasswordUser}</span>
                                <span className="font-bold text-sm mt-4 text-red-600 text-center">Antes de fechar a janela, informe o login e a senha para o usuário criado, ambos são o CPF do mesmo</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}