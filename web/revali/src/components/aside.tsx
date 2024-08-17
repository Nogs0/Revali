import { Calendar, CirclePlus, FileX2, LogOut, Settings, User, X } from "lucide-react";
import revaliLogo from "../assets/revali-logo.svg";
import { DayPicker } from 'react-day-picker';
import { ptBR } from "date-fns/locale";
import { useState } from "react";

interface AsideProps{
    handleDonation: () => void;
    handleLogout: () => void;
    daySelected: Date | undefined;
    setDaySelected: (dates: Date | undefined) => void;
    customDatePicker: {}

}

export function Aside({handleDonation, handleLogout, daySelected, setDaySelected, customDatePicker}: AsideProps){

    const today = new Date();

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    function openDatePicker() {
        setIsDatePickerOpen(true);
    }

    function closeDatePicker() {
        setIsDatePickerOpen(false);
    }

    return(
        <>
        <aside className="w-2/5 md:w-2/5 lg:w-1/4 xl:w-1/5 bg-lime-900 text-white flex flex-col">
                <div className='flex items-center gap-4 p-4'>
                    <h1 className="text-4xl md:text-5xl font-tenor">Revali</h1>
                    <img src={revaliLogo} alt="RevaliLogo" className='size-16 md:size-24' />
                </div>

                <div className='flex flex-col gap-8 tall:gap-11 p-4 tall:mt-14'>
                    <button onClick={handleDonation} className="flex items-center hover:text-zinc-300 gap-2">
                        <CirclePlus />
                        <span className="ml-2 font-semibold text-base tall:text-lg">Cadastrar Doação</span>
                    </button>
                    <button onClick={openDatePicker} className="flex items-center hover:text-zinc-300 gap-2">
                        <Calendar />
                        <span className="ml-2 font-semibold text-base tall:text-lg">Visualizar outra data</span>
                    </button>
                    <button className="flex items-center hover:text-zinc-300 gap-2">
                        <FileX2 />
                        <span className="ml-2 font-semibold text-base tall:text-lg">Gerar relatório Excel</span>
                    </button>
                </div>

                <div className="flex-grow"></div>

                <div className="flex flex-col gap-8 tall:gap-11 p-4">
                    <button className="flex items-center hover:text-zinc-300 gap-2">
                        <User />
                        <span className="ml-2 font-semibold text-base tall:text-lg">Conta</span>
                    </button>
                    <button className="flex items-center hover:text-zinc-300 gap-2">
                        <Settings />
                        <span className="ml-2 font-semibold text-base tall:text-lg">Configurações</span>
                    </button>
                </div>

                <div className='bg-lime-950 h-px mt-11'></div>

                <div className='flex items-center justify-between p-4'>
                    <div className='flex flex-col'>
                        <span className="font-semibold">Banco De Alimentos</span>
                        <span className="text-sm text-zinc-300">bancodealimentos@gmail.com</span>
                    </div>
                    <button onClick={handleLogout}>
                        <LogOut className="text-white cursor-pointer" />
                    </button>
                </div>
            </aside>
            {isDatePickerOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="rounded-xl py-5 px-6 shadow-shape bg-white space-y-5">
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
        </>
        
         
    )
}