import { ArrowRightToLine, Check, Trash2 } from "lucide-react";
import React from "react";


interface DonationFormProps{
    donorName: string;
    setDonorName: React.Dispatch<React.SetStateAction<string>>;
    foodItem: string;
    setFoodItem: React.Dispatch<React.SetStateAction<string>>;
    quantity: string;
    setQuantity: React.Dispatch<React.SetStateAction<string>>;
    foodClass: string
    setFoodClass: React.Dispatch<React.SetStateAction<string>>;
    handleAddDonation: () => void
    donations: {
        foodItem: string;
        quantity: string;
        foodClass: string;
        points: string;
    }[];
    handleRemoveDonation: (index: number) => void
}

export function DonationForm(
    {donorName, setDonorName, foodItem, setFoodItem, quantity, setQuantity, foodClass, setFoodClass, donations, handleAddDonation, handleRemoveDonation}
    : DonationFormProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-center">
                <div>
                    <label className="block text-black font-inter font-medium text-sm">Nome do doador</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 outline-none ring-lime-600 ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                    >
                        <option value="">Selecione um doador</option>
                        <option value="Antônio Oliveira">Antônio Oliveira</option>
                        <option value="Antônio Oliveira">Gabriel Almeida</option>
                        <option value="Antônio Oliveira">Rafael Alvez</option>

                    </select>
                </div>
                <div className="flex flex-col">
                    <button className="bg-lime-600 hover:bg-lime-700 text-white py-3 px-3 mt-6 rounded w-fit">
                        Adicionar novo doador
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 items-center">
                <div className="flex-1">
                    <label className="block text-black font-inter font-medium text-sm mb-1">Alimentos a serem doados</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 h-full outline-none ring-lime-600 ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
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
                        type="text"
                        placeholder="Digite uma quantidade"
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm h-full outline-none ring-lime-600 ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-black font-inter font-medium text-sm mb-1">Classe</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 h-full outline-none ring-lime-600 ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={foodClass}
                        onChange={(e) => setFoodClass(e.target.value)}
                    >
                        <option value="">Selecione uma classe</option>
                        <option value="Ótimo">Ótimo</option>
                        <option value="Bom">Bom</option>
                        <option value="Regular">Regular</option>
                        <option value="Ruim">Ruim</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <button className="bg-lime-600 hover:bg-lime-700 text-white py-3 px-3 mt-6 rounded w-fit">
                        Adicionar novo alimento
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center my-6">
                <button
                    className="bg-lime-600 hover:bg-lime-700 text-white py-2 px-4 rounded"
                    onClick={handleAddDonation}
                >
                    <Check />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Alimento</th>
                            <th className="px-4 py-2 border">Quantidade</th>
                            <th className="px-4 py-2 border">Classe</th>
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
                <button className="bg-lime-600 hover:bg-lime-700 text-white p-3 rounded flex items-center space-x-2 gap-2">
                    Confirmar Doação
                    <ArrowRightToLine />
                </button>
            </div>
        </>
    )
}