import { CircleCheck, CircleDashed, CircleX, Coins, Info, SquarePen, Trash2, X } from "lucide-react";

interface DonationHistoryProps{
    donations: {
        id: number
        name: string
        cpf: string
    }[];
    openInfoModal: () => void;
    toggleCheckCircle: (id: number) => void;
    canceledDonations: number[];
    toggleCancelCircle: (id: number) => void;
    checkedDonations: number[];
    handleRemoveDonation: (id: number) => void;
    isInfoModalOpen: boolean
    tableDonations:{
        id: number;
        foodItem: string;
        quantity: string;
        foodClass: string;
        value: string;
        total: string
        points: string;
    }[];
    closeInfoModal: () => void
    handleRemoveTableDonation: (id: number) => void;
}


export function DonationHistory({
    donations, openInfoModal, toggleCheckCircle, checkedDonations, handleRemoveDonation, isInfoModalOpen, tableDonations, closeInfoModal, handleRemoveTableDonation, toggleCancelCircle, canceledDonations
}: DonationHistoryProps){
    return(
        <div className='py-6 sm:py-9 px-4 sm:px-6 md:px-12'>
                    <h2 className="text-xl md:text-2xl font-raleway-bold mb-4">Histórico de doações</h2>
                    <div className="max-h-72 tall:max-h-[480px] overflow-y-auto">
                        <ul className="space-y-4">
                            {donations.map(donation => (
                                <li key={donation.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                                    <div className="flex items-center space-x-4">
                                        <Info className="text-green-medium  hover:text-[#6B9864] cursor-pointer" onClick={openInfoModal} />
                                        <div>
                                            <div className="font-semibold">{donation.name}</div>
                                            <div className="text-gray-500">CPF: {donation.cpf}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <button onClick={() => toggleCheckCircle(donation.id)}>
                                            {checkedDonations.includes(donation.id) ? (
                                                <CircleCheck className="text-green-medium hover:text-[#6B9864] w-8 h-8" />
                                            ) : (
                                                <CircleDashed className="text-gray-400 hover:text-gray-500 w-8 h-8" />
                                            )}
                                        </button>
                                        <button onClick={() => toggleCancelCircle(donation.id)}>
                                            {canceledDonations.includes(donation.id) ? (
                                                <CircleX className="text-red-500 hover:text-red-600 cursor-pointer"/>
                                            ) : (
                                                <CircleX className="text-gray-500 hover:text-gray-600 cursor-pointer"/>
                                            )}
                                        </button>
                                        
                                        <Trash2 className="text-red-600 hover:text-red-700 cursor-pointer" onClick={() => handleRemoveDonation(donation.id)} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {isInfoModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Informações da doação</h2>
                                    <button>
                                        <X className="size-5 text-zinc-400 hover:text-zinc-600" onClick={closeInfoModal} />
                                    </button>
                                </div>
                                <div className='flex gap-4'>
                                    <p className='font-inter font-medium text-sm'>Nome: Antônio Oliveira</p>
                                    <p className='font-inter font-medium text-sm'>CPF: XXX.XXX.XXX-XX:</p>
                                    <p className='font-inter font-medium text-sm'>Email: email@example.com</p>   
                                </div>
            
                                {/* table */}
                                <div className="overflow-y-auto max-h-72">
                                    <table className="min-w-full bg-white rounded-lg border-gray-300">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="py-3 text-left text-sm font-medium text-gray-700">Ações</th>
                                                <th className="py-3 text-left text-sm font-medium text-gray-700">Alimento</th>
                                                <th className="py-3 text-left text-sm font-medium text-gray-700">Quantidade</th>
                                                <th className="py-3 text-left text-sm font-medium text-gray-700">Qualidade</th>
                                                <th className="py-3 text-left text-sm font-medium text-gray-700">Preço(kg)</th>
                                                <th className="py-3 text-left text-sm font-medium text-gray-700">Total(R$)</th>
                                                <th className="py-3 text-left text-sm font-medium text-gray-700 flex gap-1">Pontos <Coins/></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableDonations.map((tableDonations, index) => (
                                                <tr key={tableDonations.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                                    <td className="py-4 whitespace-nowrap">
                                                        <button className="text-blue-500 hover:text-blue-700 mr-4">
                                                            <SquarePen size={16} />
                                                        </button>
                                                        <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveTableDonation(tableDonations.id)}>
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                    <td className="py-4 whitespace-nowrap">{tableDonations.foodItem}</td>
                                                    <td className="py-4 whitespace-nowrap">{tableDonations.quantity}</td>
                                                    <td className="py-4 whitespace-nowrap">{tableDonations.foodClass}</td>
                                                    <td className="py-4 whitespace-nowrap">{tableDonations.value}</td>
                                                    <td className="py-4 whitespace-nowrap">{tableDonations.total}</td>
                                                    <td className="py-4 whitespace-nowrap">{tableDonations.points}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* final table */}
                            </div>
                        </div>
                    </div>
                )}
                </div>
                
    )
}