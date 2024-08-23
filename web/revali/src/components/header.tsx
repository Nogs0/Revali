import { Calendar, MapPin } from "lucide-react"

interface HeaderProps{
    displayedDate: string | null;
    day: number;
    month: string
}


export function Header({displayedDate, month, day}: HeaderProps) {
    return (
        <header className="flex justify-between items-center bg-green-medium text-green-dark py-4 px-5 font-medium">
            <span className="text-xs sm:text-sm flex items-center gap-2">
                <MapPin />
                Poços de Caldas, Brasil
            </span>
            <span className="text-xs sm:text-sm flex items-center gap-2">
                <Calendar />
                {displayedDate || `${day} de ${month}`}
            </span>
        </header>
    )
}


