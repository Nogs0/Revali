import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { HeaderDonationPage } from '../components/header-donation-page';
import { DonationForm } from '../components/donation-form';


interface Donation {
    foodItem: string;
    quantity: string;
    foodClass: string;
    value: string;
    total: string;
    points: string;
}

const initialTableDonations = [
    { id: 1, foodItem: 'Tomate', quantity: '10kg', foodClass: 'Ótimo', value:'5,50', total:'55', points: '2300' },
    { id: 2, foodItem: 'Laranja Lima', quantity: '30kg', foodClass: 'Bom', value:'7,80', total:'234', points: '2700' },
    { id: 3, foodItem: 'Abacaxi', quantity: '5kg', foodClass: 'Regular', value:'9,10', total:'45,5', points: '700' },
    

];

export function Donation() {                                                                        

    const navigate = useNavigate();

    const [donations, setDonations] = useState<Donation[]>(initialTableDonations);


    // Remove uma doação da lista com base no índice
    

    function handleBackToHomepage() {
        navigate('/homepage');
    }

    return (
        <div>
            <HeaderDonationPage
            handleBackToHomepage={handleBackToHomepage}
            />
            <div className='w-full'>
                <div className="min-h-screen bg-green-light flex flex-col items-center py-10">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl">
                        <h2 className="text-2xl font-raleway-bold mb-4"> Doação de Alimentos</h2>
                        <DonationForm
                            donations={donations}
                        />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

