import { ptBR } from "date-fns/locale";
import { Calendar, MapPin, X } from "lucide-react"
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import seloProex from '../assets/seloProex.png'

interface HeaderProps{
    displayedDate: string | null;
    day: number;
    month: string;
    daySelected: Date | undefined;
    setDaySelected: (dates: Date | undefined) => void;
    customDatePicker: {};
}


export function Header({displayedDate, month, day, daySelected, setDaySelected, customDatePicker}: HeaderProps) {


    const today = new Date();

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    function openDatePicker() {
        setIsDatePickerOpen(true);
    }

    function closeDatePicker() {
        setIsDatePickerOpen(false);
    }
    
    return (
        <header className="flex justify-between items-center bg-green-medium text-green-dark py-4 px-5 font-medium">
            <span className="text-xs sm:text-sm flex items-center gap-2">
                <MapPin />
                Poços de Caldas, Brasil
            </span>
            <img src={seloProex} alt="" className="w-24"/>
            <Tippy content="Selecione uma data">
                <button onClick={openDatePicker} className="text-xs sm:text-sm flex items-center gap-2 hover:text-green-800 hover:cursor-pointer">
                    <Calendar />
                    {displayedDate || `${day} de ${month}`}
                </button>
            </Tippy>


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


