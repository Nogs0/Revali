import { ArrowRightToLine, Check, Trash2, X } from "lucide-react";
import { useState } from "react";
import InputMask from 'react-input-mask';

import { getUsers } from "../http/get-users";
import { getProduct } from "../http/get-product";
import { useQuery } from "react-query";
import { getClassification } from "../http/get-classification";
import { getBanco } from "../http/get-banco";
import { api } from "../services/api";
import { toast } from "sonner";

interface DonationFormProps {
    donations: {
        foodItem: string;
        quantity: string;
        foodClass: string;
        value: string;
        total: string;
        points: string;
    }[];
}

export function DonationForm({donations}: DonationFormProps) {

   interface Item {
        nome_produto: string;
        quantidade: string;
        qualidade: string;
        preco: string;
        total: number;
        pontos: number;
        produto_id: number;
        classificacoes_id: number;

    } 

    const [newUserModal, setNewUserModal] = useState(false);
    const [selectDonator, setSelectDonator] = useState("");
    const [selectProduct, setSelectProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [selectClassification, setSelectClassification] = useState("");
    const [selectBanco, setSelectBanco] = useState<number>();


  

    const{ data: usersData, isError: isUserError, isLoading: isUserLoading } = useQuery("user-list", getUsers);
    const{data: productData, isError:isProductError, isLoading: isProductLoading} = useQuery("products-list", getProduct);
    const{data: classificationData, isError:isClassificationError, isLoading: isClassificationLoading} = useQuery("classification-list", getClassification);
    const{data: bancoData, isError:isBancoError, isLoading: isBancoLoading} = useQuery("banco-list", getBanco);
    
    const [items, setItems] = useState<Item[]>([]);
   
    
    function openNewUserModal(){
        setNewUserModal(true)
    }

    function closeNewUserModal(){
        setNewUserModal(false)
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
        console.log(value)
    }

    const handleSelectBanco = (event: any) => {
        const value = event.target.value
        setSelectBanco(value)
    }

    const handleInputQuantity = (event: any) => {
        const value = event.target.value
        setQuantity(value)
        console.log(value)
    }

    const handleRemoveDonation = (index: number) => {
        const donationsRows = items.filter((_, x) => x!==index)
        
        setItems(donationsRows)
    };

    const handleSubmit = async() => {
        let produtos = [] as any
        items.map((x) => {
            produtos.push({produto_id: x.produto_id, quantidade: Number(x.quantidade), classificacoes_id: x.classificacoes_id})
        })


        try {
            const response = await api.post("/salvar-doacao", {
                data: new Date().toISOString().split("T")[0],
                doador_id: Number(selectDonator),
                banco_de_alimento_id: Number(selectBanco),
                produtos: produtos
            });
            toast.success('Doação feita com sucesso'); 
            console.log(response);
        } catch (error) {
            toast.error('Ocorreu um erro no processo de doação');
        }

    };



    const handleAddTable = () => {
        let tableItems = [] as any[];
      
        // Encontre as informações do produto selecionado
        const productInfo = productData?.find((x) => parseInt(x.id) === parseInt(selectProduct));
      
        // Encontre as informações da classificação selecionada
        const classificationInfo = classificationData?.find((x) => x.id === parseInt(selectClassification));
      
        if (productInfo && classificationInfo) {
          const total = parseFloat(quantity) * parseFloat(productInfo.preco_dia);                                                                           
      
          tableItems.push({
            produto_id: productInfo.id,
            classificacoes_id: classificationInfo.id,
            nome_produto: productInfo.nome_produto,
            quantidade: quantity,
            qualidade: classificationInfo.tipo,
            preco: productInfo.preco_dia,
            total: total,
            pontos: total * 0.5
          });
      
          // Atualiza o estado usando a cópia do array existente
          setItems((prevItems) => [...prevItems, ...tableItems]);

      
          console.log(tableItems);
        }
      };

    return (
        
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-center">
                <div>
                    <label className="block text-black font-inter font-medium text-sm">Nome do doador</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={selectDonator}
                        onChange={handleSelectChange}
                    >
                        <option value="">Selecione um doador</option>
                        {isUserLoading && <option value="">Carregando...</option>}
                        {isUserError && <option value="">Ocorreu um erro!</option>}
                        {usersData?.map((user) => (
                            <option value={user.id}>{user.name}</option>
                        ))}

                    </select>
                </div>
                <div>
                    <label className="block text-black font-inter font-medium text-sm">Banco de alimentos</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={selectBanco}
                        onChange={handleSelectBanco}
                    >
                        <option value="">Selecione um banco de alimentos</option>
                        {isBancoLoading && <option value="">Carregando...</option>}
                        {isBancoError && <option value="">Ocorreu um erro!</option>}
                        {bancoData?.map((banco) => (
                            <option value={banco.id}>{banco.nome}</option>
                        ))}

                    </select>
                </div>
                <div className="flex flex-col">
                    <button onClick={openNewUserModal} className="bg-green-medium hover:bg-[#6C9965] text-white  py-3 px-3 mt-6 rounded w-fit">
                        Adicionar novo doador
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 items-center">
                <div className="flex-1">
                    <label className="block text-black font-inter font-medium text-sm mb-1">Alimentos a serem doados</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={selectProduct}
                        onChange={handleSelectProduct}
                    >
                        <option value="">Selecione um alimento</option>
                        {isProductLoading && <option value="">Carregando...</option>}
                        {isProductError && <option value="">Ocorreu um erro!</option>}
                        {productData?.map((product) => (
                            <option value={product.id}>{product.nome_produto}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-black font-inter font-medium text-sm mb-1">Quantidade</label>
                    <input
                        type="number"
                        placeholder="Digite a quantidade"
                        onChange={handleInputQuantity}
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-black font-inter font-medium text-sm mb-1">Qualidade</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={selectClassification}
                        onChange={handleSelectClassification}
                    >
                        <option value="">Selecione a qualidade</option>
                        {isClassificationLoading && <option value="">Carregando...</option>}
                        {isClassificationError && <option value="">Ocorreu um erro!</option>}
                        {classificationData?.map((classification) => (
                            <option value={classification.id}>{classification.tipo}</option>
                        ))}
                    </select>
                </div>


                <div>
                    <label className="block text-black font-inter font-medium text-sm mb-1">Preço(kg)</label>
                    <input
                        type="number"
                        placeholder="Digite o preço"
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                    />
                </div> 

                <div className="mt-6">
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
                 className="bg-green-medium hover:bg-[#6C9965] text-white p-3 rounded flex items-center space-x-2 gap-2"
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
                        <form className="flex flex-col gap-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome Completo"
                                required
                                className="px-4 py-3 border rounded outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            />
                            <InputMask
                                mask="999.999.999-99"
                                type="text"
                                placeholder="CPF"
                                required
                                className="px-4 py-3 border rounded outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="px-4 py-3 border rounded outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            />
                            <button
                                type="submit"
                                className="mt-6 bg-green-medium hover:bg-[#6C9965] text-white py-3 rounded flex justify-center items-center"
                                
                            >
                                Cadastrar <ArrowRightToLine className="ml-2" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            )}

        </>
    )
}