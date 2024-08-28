import { ArrowLeftFromLine } from "lucide-react";
import revaliLogo from "../assets/revali-logo.svg";

interface HeaderDonationPageProps{
    handleBackToHomepage: () => void
}

export function HeaderDonationPage({handleBackToHomepage}: HeaderDonationPageProps) {
    return (
        <div className=' bg-green-dark flex items-center gap-8 p-4 shadow-shape'>
            <button onClick={handleBackToHomepage}><ArrowLeftFromLine className='text-white hover:text-gray-300 size-9' /></button>
            <div className='flex items-center gap-3'>
                <img src={revaliLogo} alt="RevaliLogo" className='size-20' />
                <h1 className='text-5xl font-ltrenovate-bold text-white font-normal mt-4'>REVALI</h1>
            </div>
        </div>
    )
}