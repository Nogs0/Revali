import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { HeaderDonationPage } from '../components/header-donation-page';
import { DonationForm } from '../components/donation-form';


interface Donation {
    foodItem: string;
    quantity: string;
    foodClass: string;
    points: string;
}

const initialTableDonations = [
    { id: 1, foodItem: 'Tomate', quantity: '10kg', foodClass: 'Otimo', points: '2300' },
    { id: 1, foodItem: 'Laranja Lima', quantity: '30kg', foodClass: 'Bom', points: '2700' },
    { id: 1, foodItem: 'Abacaxi', quantity: '5kg', foodClass: 'Regular', points: '700' },
    

];

export function Donation() {

    const navigate = useNavigate();

    const [donations, setDonations] = useState<Donation[]>(initialTableDonations);
    const [donorName, setDonorName] = useState('');
    const [foodItem, setFoodItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [foodClass, setFoodClass] = useState('');
    const [points, setPoints] = useState('');

    // Adiciona uma nova doação à lista
    const handleAddDonation = () => {
        if (foodItem && quantity && foodClass && points) {
            setDonations([
                ...donations,
                { foodItem, quantity, foodClass, points },
            ]);
            setFoodItem('');
            setQuantity('');
            setFoodClass('');
            setPoints('');
        }
    };

    // Remove uma doação da lista com base no índice
    const handleRemoveDonation = (index: number) => {
        setDonations(donations.filter((_, i) => i !== index));
    };

    function handleBackToHomepage() {
        navigate('/homepage');
    }

    return (
        <div>
            <HeaderDonationPage
            handleBackToHomepage={handleBackToHomepage}
            />
            <div className='w-full'>
                <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl">
                        <h2 className="text-2xl font-bold mb-4"> Doação de Alimentos</h2>
                        <DonationForm
                            donorName={donorName}
                            setDonorName={setDonorName}
                            foodItem={foodItem}
                            setFoodItem={setFoodItem}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            foodClass={foodClass}
                            setFoodClass={setFoodClass}
                            handleAddDonation={handleAddDonation}
                            donations={donations}
                            handleRemoveDonation={handleRemoveDonation}
                        />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

