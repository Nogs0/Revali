import { MapPin, Calendar, Info, CircleCheck, Trash2, CircleDashed, CirclePlus, FileX2, User, Settings, LogOut, X } from 'lucide-react';
import revaliLogo from "../assets/revali-logo.svg";
import { useNavigate } from 'react-router-dom'
import { DayPicker } from 'react-day-picker';
import { ptBR } from "date-fns/locale";
import { format } from 'date-fns';
import { useState } from 'react';
import React from 'react';
import "react-day-picker/style.css";


interface Donation {
    id: number;
    name: string;
    cpf: string;
    status: 'completed' | 'pending';
}



const donations: Donation[] = [
    { id: 1, name: 'Antônio Oliveira', cpf: 'XXX.XXX.XXX-XX', status: 'completed' },
    { id: 2, name: 'Gabriel Almeida', cpf: 'XXX.XXX.XXX-XX', status: 'pending' },
];


export function Homepage() {

    const navigate = useNavigate();

    const monthNames = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const today = new Date();
    const day = today.getDate();
    const month = monthNames[today.getMonth()]; // Obtém o nome do mês
    const year = today.getFullYear();
    
    

    const customDatePicker = {
        selected: 'bg-lime-600 text-white border-none rounded-full',
        today: 'bg-lime-500 text-white hover:bg-lime-600 border-none rounded-full',
        nav_button: 'text-lime-600 hover:text-green-700',
    };
    const [daySelected, setDaySelected] = React.useState<Date | undefined>();
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    function openDatePicker() {
        setIsDatePickerOpen(true);
    }

    function closeDatePicker() {
        setIsDatePickerOpen(false);
    }

    const displayedDate = daySelected ? format(daySelected, "d' de 'MMMM",  { locale: ptBR }) : null

    

    function handleLogout() {
        navigate('/');
    }

    function hadleDonation() {
        navigate('/homepage/donation')
    }

    return (
        <div className="flex flex-grow h-screen">
            <aside className="w-1/5 bg-lime-900 text-white flex flex-col">
                <div className='flex items-center gap-4 ml-4 p-4'>
                    <h1 className="text-[64px] font-tenor">Revali</h1>
                    <img src={revaliLogo} alt="RevaliLogo" className='size-32' />
                </div>

                <div className='flex flex-col gap-11 ml-4 p-4 mt-14'>
                    <button onClick={hadleDonation} className="flex items-center hover:text-zinc-300 gap-2">
                        <CirclePlus />
                        <span className="ml-2 font-semibold text-lg">Cadastrar Doação</span>
                    </button>
                    <button className="flex items-center hover:text-zinc-300 gap-2">
                        <Calendar />
                        <span className="ml-2 font-semibold text-lg" onClick={openDatePicker}>Visualizar outra data</span>
                    </button>
                    <button className="flex items-center hover:text-zinc-300 gap-2">
                        <FileX2 />
                        <span className="ml-2 font-semibold text-lg">Gerar relatório Excel</span>
                    </button>
                </div>


                <div className="flex-grow"></div>

                <div className="flex flex-col gap-11 ml-4 p-4">
                    <button className="flex items-center hover:text-zinc-300 gap-2">
                        <User />
                        <span className="ml-2 font-semibold text-lg">Conta</span>
                    </button>
                    <button className="flex items-center hover:text-zinc-300 gap-2">
                        <Settings />
                        <span className="ml-2 font-semibold text-lg">Configurações</span>
                    </button>
                </div>

                <div className='bg-lime-950 h-px mt-11'></div>


                <div className='flex items-center justify-between ml-4 p-4'>
                    <div className='flex flex-col'>
                        <span className="font-semibold">Banco De Alimentos</span>
                        <span className="text-sm text-zinc-300">bancodealimentos@gmail.com</span>
                    </div>
                    <button onClick={handleLogout}>
                        <LogOut className="text-white cursor-pointer" />
                    </button>

                </div>
            </aside>

            <main className="w-10/12 bg-gray-100">
                <header className="flex justify-between items-center bg-lime-700 text-white py-4 px-5">
                    <span className="text-sm flex items-center gap-2">
                        <MapPin />
                        Poços de Caldas, Brasil
                    </span>
                    <span className="text-sm flex items-center gap-2">
                        <Calendar />
                        {displayedDate || `${day} de ${month}`}
                    </span>
                </header>

                <div className='py-9 px-12'>
                    <h2 className="text-2xl font-bold mb-4">Histórico de doações</h2>
                    <div className="max-h-96 overflow-y-auto">
                        <ul className="space-y-4">
                            {donations.map(donation => (
                                <li key={donation.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                                    <div className="flex items-center space-x-4">
                                        <Info className="text-lime-600" />
                                        <div>
                                            <div className="font-semibold">{donation.name}</div>
                                            <div className="text-gray-500">CPF: {donation.cpf}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        {donation.status === 'completed' ? (
                                            <CircleCheck className="text-lime-600 cursor-pointer" />
                                        ) : (
                                            <CircleDashed className="text-zinc-500 cursor-pointer" />
                                        )}
                                        <Trash2 className="text-red-600 cursor-pointer" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {isDatePickerOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                        <div className=" rounded-xl py-5 px-6 shadow-shape bg-white space-y-5">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-lg font-semibold">Selecione a data</h2>
                                    <button>
                                        <X className="size-5 text-zinc-400" onClick={closeDatePicker} />
                                    </button>
                                </div>
                            </div>
                            <DayPicker mode="single" locale={ptBR} disabled={[
                                { from: new Date(today.setDate(today.getDate() + 1)), to: new Date(9999, 11, 31) },
                            ]} classNames={customDatePicker} selected={daySelected} onSelect={setDaySelected} />
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
