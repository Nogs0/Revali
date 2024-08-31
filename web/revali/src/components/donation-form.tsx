import { ArrowRightToLine, Check, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { getUsers } from "../http/get-users";
import { useQuery } from "react-query";


interface DonationFormProps {
    donorName: string;
    setDonorName: React.Dispatch<React.SetStateAction<string>>;
    foodItem: string;
    setFoodItem: React.Dispatch<React.SetStateAction<string>>;
    quantity: string;
    setQuantity: React.Dispatch<React.SetStateAction<string>>;
    foodClass: string;
    setFoodClass: React.Dispatch<React.SetStateAction<string>>;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    total: string;
    setTotal: React.Dispatch<React.SetStateAction<string>>;
    handleAddDonation: () => void
    donations: {
        foodItem: string;
        quantity: string;
        foodClass: string;
        value: string;
        total: string;
        points: string;
    }[];
    handleRemoveDonation: (index: number) => void
}

export function DonationForm({
    donorName,
    setDonorName,
    foodItem,
    setFoodItem,
    quantity,
    setQuantity,
    foodClass,
    setFoodClass,
    value,
    setValue,
    total,
    setTotal,
    donations,
    handleAddDonation,
    handleRemoveDonation,
}: DonationFormProps) {

    const [newUserModal, setNewUserModal] = useState(false);
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');

    const{ data: usersData, isError: isUserError, isLoading: isUserLoading } = useQuery("user-list", getUsers);
    

    // Função para formatar CPF
    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        const formattedCpf = inputValue.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);

        if (formattedCpf) {
            setCpf(
                !formattedCpf[2]
                    ? formattedCpf[1]
                    : `${formattedCpf[1]}.${formattedCpf[2]}${formattedCpf[3] ? `.${formattedCpf[3]}` : ''}${formattedCpf[4] ? `-${formattedCpf[4]}` : ''}`
            );
        }
    };

    // Função para formatar Telefone
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        const formattedPhone = inputValue.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    
        if (formattedPhone) {
          setPhone(
            !formattedPhone[2]
              ? formattedPhone[1]
              : `(${formattedPhone[1]}) ${formattedPhone[2]}${formattedPhone[3] ? `-${formattedPhone[3]}` : ''}`
          );
        }
    };
    
    function openNewUserModal(){
        setNewUserModal(true)
    }

    function closeNewUserModal(){
        setNewUserModal(false)
    }

    return (
        
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-center">
                <div>
                    <label className="block text-black font-inter font-medium text-sm">Nome do doador</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                    >
                        <option value="">Selecione um doador</option>
                        {isUserLoading && <option value="">Carregando...</option>}
                        {isUserError && <option value="">Ocorreu um erro!</option>}
                        {usersData?.map((user) => (
                            <option value={user.name}>{user.name}</option>
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
                        value={foodItem}
                        onChange={(e) => setFoodItem(e.target.value)}
                    >
                        <option value="">Selecione um alimento</option>
                        <option value="Abacaxi">Abacaxi</option>
                        <option value="Tomate">Tomate</option>
                        <option value="Laranja Lima">Laranja Lima</option>
                    </select>
                </div>

                <div>
                    <label className="block text-black font-inter font-medium text-sm mb-1">Quantidade</label>
                    <input
                        type="number"
                        placeholder="Digite a quantidade"
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-black font-inter font-medium text-sm mb-1">Qualidade</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={foodClass}
                        onChange={(e) => setFoodClass(e.target.value)}
                    >
                        <option value="">Selecione a qualidade</option>
                        <option value="Ótimo">Ótimo</option>
                        <option value="Bom">Bom</option>
                        <option value="Regular">Regular</option>
                        <option value="Ruim">Ruim</option>
                    </select>
                </div>


                <div>
                    <label className="block text-black font-inter font-medium text-sm mb-1">Preço(kg)</label>
                    <input
                        type="number"
                        placeholder="Digite o preço"
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <div className="mt-6">
                    <button
                        className="bg-green-medium hover:bg-[#6C9965] text-white  py-2 px-4 rounded"
                        onClick={handleAddDonation}
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
                        {donations.map((donation, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                <td className="px-4 py-2 border">{donation.foodItem}</td>
                                <td className="px-4 py-2 border">{donation.quantity}</td>
                                <td className="px-4 py-2 border">{donation.foodClass}</td>
                                <td className="px-4 py-2 border">{donation.value}</td>
                                <td className="px-4 py-2 border">{donation.total}</td>
                                <td className="px-4 py-2 border">{donation.points}</td>
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
                <button className="bg-green-medium hover:bg-[#6C9965] text-white p-3 rounded flex items-center space-x-2 gap-2">
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
                            <input
                                type="text"
                                name="cpf"
                                value={cpf}
                                onChange={handleCpfChange}
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