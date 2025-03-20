import { ptBR } from "date-fns/locale";
import { Calendar, MapPin, X } from "lucide-react"
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import seloProex from '../assets/seloProex.png'
import { BancoDeAlimentos } from "../models/BancoDeAlimentoModel";
import { api } from "../services/api";

interface HeaderProps {
    displayedDate: string | null;
    day: number;
    month: string;
    daySelected: Date | undefined;
    donationHistory: string | null;
    setDaySelected: (dates: Date | undefined) => void;
    customDatePicker: {};

}


export function Header({ displayedDate, month, day, daySelected, donationHistory, setDaySelected, customDatePicker }: HeaderProps) {


    const today = new Date();
    const bancoId = localStorage.getItem("banco-alimentos-id");
    const tipo = localStorage.getItem('tipo');

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [bancoLocation, setBancoLocation] = useState("");

    function openDatePicker() {
        setIsDatePickerOpen(true);
    }

    function closeDatePicker() {
        setIsDatePickerOpen(false);
    }

    async function getBancoLocation() {
        const accessToken = localStorage.getItem('token-validate');

        // Verifica se o token existe antes de fazer a requisição
        if (!accessToken) {
            throw new Error('Access token is not available');
        }

        try {
            const response = await api.get<BancoDeAlimentos>(`/bancos-de-alimentos/${bancoId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const bancoNome = response.data.nome
            setBancoLocation(bancoNome)
            console.log(bancoNome);
        } catch (error) {
            // Trata o erro da requisição
            console.error('Error fetching banco:', error);
            throw error; // Re-throw the error after logging it
        }
    }

    useEffect(() => {
        getBancoLocation();
    }, []);

    return (
        <header className="flex justify-between items-center bg-green-medium text-green-dark py-4 px-5 font-medium">
            <span className="text-xs sm:text-sm flex items-center gap-2">
                <MapPin />
                {bancoLocation}
            </span>
            <img src={seloProex} alt="" className="w-24" />
            {tipo !== "3" && (
                <Tippy content="Selecione uma data">
                    <button
                        onClick={donationHistory === "donationHistory" ? openDatePicker : undefined}
                        className={`text-xs sm:text-sm flex items-center gap-2 ${
                            donationHistory === "donationHistory"
                                ? 'hover:text-green-800 hover:cursor-pointer'
                                : 'text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={donationHistory !== "donationHistory"}
                    >
                        <Calendar />
                        {displayedDate || `${day} de ${month}`}
                    </button>
                </Tippy>
            )}



            {isDatePickerOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="rounded-xl py-5 px-6 shadow-shape bg-white space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="font-lg font-semibold">Selecione a data</h2>
                                <button>
                                    <X className="size-5 text-zinc-400 hover:text-zinc-500" onClick={closeDatePicker} />
                                </button>
                            </div>
                        </div>
                        <DayPicker mode="single" locale={ptBR} disabled={[
                            { from: new Date(today.setDate(today.getDate() + 1)), to: new Date(9999, 11, 31) },
                        ]} classNames={customDatePicker} selected={daySelected} onSelect={setDaySelected} />
                    </div>
                </div>
            )}
        </header>


    )
}


