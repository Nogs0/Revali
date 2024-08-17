import { useNavigate } from 'react-router-dom'
import { ptBR } from "date-fns/locale";
import { format } from 'date-fns';
import { useState } from 'react';
import React from 'react';
import "react-day-picker/style.css";
import { Aside } from '../components/aside';
import { Header } from '../components/header';
import { DonationHistory } from '../components/donation-history';



const initialDonations = [
    { id: 1, name: 'Antônio Oliveira', cpf: 'XXX.XXX.XXX-XX' },
    { id: 2, name: 'Gabriel Almeida', cpf: 'XXX.XXX.XXX-XX' },

];

const initialTableDonations = [
    { id: 1, alimento: 'Tomate', quantidade: '10kg', classe: 'Otimo', pontos: '2300' },
    { id: 2, alimento: 'Abacaxi', quantidade: '3kg', classe: 'Bom', pontos: '900' },
    { id: 3, alimento: 'Laranja lima', quantidade: '22kg', classe: 'Bom', pontos: '2400' },

];

const monthNames = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

export function Homepage() {

    const navigate = useNavigate();

    const today = new Date();
    const day = today.getDate();
    const month = monthNames[today.getMonth()]; // Obtém o nome do mês

    const customDatePicker = {
        selected: 'bg-lime-600 text-white border-none rounded-full',
        today: 'bg-lime-500 text-white hover:bg-lime-600 border-none rounded-full',
        nav_button: 'text-lime-600 hover:text-green-700',
    };

    const [daySelected, setDaySelected] = React.useState<Date | undefined>();
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [checkedDonations, setCheckedDonations] = useState<number[]>([]);
    const [donations, setDonations] = useState(initialDonations);
    const [tableDonations, setTableDonations] = useState(initialTableDonations);

    function toggleCheckCircle(id: number) {
        setCheckedDonations((prevChecked) =>
            prevChecked.includes(id)
                ? prevChecked.filter(donationId => donationId !== id)
                : [...prevChecked, id]
        );
    }



    function openInfoModal() {
        setIsInfoModalOpen(true);
    }

    function closeInfoModal() {
        setIsInfoModalOpen(false);
    }

    function handleRemoveDonation(id: number) {
        setDonations((prevDonations) => prevDonations.filter(donation => donation.id !== id));
    }

    function handleRemoveTableDonation(id: number) {
        setTableDonations((prevTableDonations) => prevTableDonations.filter(tableDonation => tableDonation.id !== id));
    }

    const displayedDate = daySelected ? format(daySelected, "d' de 'MMMM", { locale: ptBR }) : null

    function handleLogout() {
        navigate('/');
    }

    function handleDonation() {
        navigate('/homepage/donation')
    }

    return (

        <div className="flex flex-grow h-screen ">
            <Aside
                handleDonation={handleDonation}
                handleLogout={handleLogout}
                daySelected={daySelected}
                setDaySelected={setDaySelected}
                customDatePicker={customDatePicker}

            />

            <main className="w-full md:w-3/5 lg:w-3/4 xl:w-4/5 bg-gray-100">
                <Header
                    day={day}
                    month={month}
                    displayedDate={displayedDate}
                />

                <DonationHistory
                    donations={donations}
                    openInfoModal={openInfoModal}
                    toggleCheckCircle={toggleCheckCircle}
                    checkedDonations={checkedDonations}
                    handleRemoveDonation={handleRemoveDonation}
                    isInfoModalOpen={isInfoModalOpen}
                    tableDonations={tableDonations}
                    closeInfoModal={closeInfoModal}
                    handleRemoveTableDonation={handleRemoveTableDonation}
                />


            </main>
        </div>
    );
}
