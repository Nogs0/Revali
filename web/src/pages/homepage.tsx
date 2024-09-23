import { useNavigate } from 'react-router-dom'
import { ptBR } from "date-fns/locale";
import { format} from 'date-fns';
import { useState } from 'react';
import React from 'react';
import "react-day-picker/style.css";
import { Aside } from '../components/aside';
import { Header } from '../components/header';
import { DonationHistory } from '../components/donation-history';
import { Account } from '../components/account';
import { AddNewEnterprise } from '../components/addNewEnterprise';
import { AddProduct } from '../components/addProduct';
import { useAuth } from '../context/authContext';
import { Ranking } from '../components/ranking';
import { ClaimedItems } from '../components/claimedItems';
import { AddUser } from '../components/addUser';

const monthNames = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

export function Homepage() {

    const navigate = useNavigate();
    const {  logout } = useAuth();

    const today = new Date();
    const day = today.getDate();
    const month = monthNames[today.getMonth()]; // Obtém o nome do mês

    const customDatePicker = {
        selected: 'bg-green-medium text-white border-none rounded-full',
        today: 'bg-green-dark text-white hover:bg-lime-600 border-none rounded-full',
    };

    const [daySelected, setDaySelected] = React.useState<Date | undefined>();
    const [userSettings, setUserSettings] = useState(false);
    const [addNewEnterprise, setAddNewEnterprise] = useState(false)
    const [addProduct, setAddProduct] = useState(false)
    const [donationHistory, setDonationHistory] = useState(false);
    const [claimedItems, setClaimedItems] = useState(false)
    const [newUser, setNewUser] = useState(false)


    function openAddNewUser(){
        setNewUser(true);
    }

    function closeAddNewUser(){
        setNewUser(false);
    }

    function openClaimedItems(){
        setClaimedItems(true);
    }

    function closeClaimedItems(){
        setClaimedItems(false);
    }
    
    function openUserSettings(){
        setUserSettings(true);
    }

    function closeUserSettings(){
        setUserSettings(false);
    }

    function openAddNewEnterprise(){
        setAddNewEnterprise(true);
    }

    function closeAddNewEnterprise(){
        setAddNewEnterprise(false);
    }

    function openAddProduct(){
        setAddProduct(true);
    }

    function closeAddProduct(){
        setAddProduct(false);
    }

    function openDonationHistory(){
        setDonationHistory(true);
    }

    function closeDonationHistory(){
        setDonationHistory(false);
    }

    const displayedDate = daySelected ? format(daySelected, "d' de 'MMMM", { locale: ptBR }) : null
    const sendTodayDate = new Date().toISOString().split("T")[0];
    const sendSelectDate = daySelected ? format(daySelected, "yyyy-MM-dd", { locale: ptBR }) : sendTodayDate;

    function handleLogout() {
        logout();
        navigate('/');
    }

    function handleDonation() {
        navigate('/homepage/donation')
    }

    return (

        <div className="flex flex-grow h-screen max-h-screen overflow-y-auto ">
            <Aside
                handleDonation={handleDonation}
                handleLogout={handleLogout}
                openUserSettings={openUserSettings}
                closeUserSettings={closeUserSettings}
                openAddNewEnterprise={openAddNewEnterprise}
                closeAddNewEnterprise={closeAddNewEnterprise}
                openAddProduct={openAddProduct}
                closeAddProduct={closeAddProduct}
                openDonationHistory={openDonationHistory}
                closeDonationHistory={closeDonationHistory}
                openClaimedItems={openClaimedItems}
                closeClaimedItems={closeClaimedItems}
                openAddNewUser={openAddNewUser}
                closeAddNewUser={closeAddNewUser}

            />

            <main className="w-full md:w-3/5 lg:w-3/4 xl:w-4/5 bg-gray-100">
                <Header
                    day={day}
                    month={month}
                    displayedDate={displayedDate}
                    daySelected={daySelected}
                    setDaySelected={setDaySelected}
                    customDatePicker={customDatePicker}
                    donationHistory={donationHistory}
                />

                {userSettings ? (     
                    <Account />
                ) : addNewEnterprise ? (
                    <AddNewEnterprise/>     
                ) : addProduct ? (                   
                    <AddProduct/>             
                ) : donationHistory ? (              
                    <DonationHistory
                    sendSelectDate={sendSelectDate}
                    />
                ) : claimedItems ? (
                    <ClaimedItems/>
                ) : newUser ? (
                    <AddUser/>
                ) : (
                    <Ranking/>
                )}
            </main>
        </div>
    );
}
