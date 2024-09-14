import { useNavigate } from 'react-router-dom'
import { HeaderDonationPage } from '../components/header-donation-page';
import { DonationForm } from '../components/donation-form';

export function Donation() {                                                                        

    const navigate = useNavigate();

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
                        <DonationForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}

