import revaliLogo from "../assets/revali-logo.svg"
import { LogIn } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { FormEvent } from "react";


export function Login() {

    const navigate = useNavigate()
 
     async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        
        const data = new FormData(event.currentTarget)
        const email = data.get('email')?.toString()
        const password = data.get('password')?.toString()

        if(!email || !password){
            return
        }

        navigate('/homepage')

    }


    return(
        <main className="h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className='bg-gray-300 w-[706px] h-[694px] rounded-lg flex flex-col py-7 items-center shadow-shape'>
                <img src={revaliLogo} alt="alt" className="h-52"/>

                <input type="email" required name="email" placeholder="Email" className="w-[466px] mx-28 my-7 px-9 py-6 rounded-lg text-xl font-bold font-sans placeholder-black placeholder-opacity-60 outline-none"/>
                <input type="password" required name="password" placeholder="Senha" className="w-[466px] mx-28 px-9 py-6 rounded-lg text-xl font-bold font-sans placeholder-black placeholder-opacity-60 outline-none"/>

                <button type="submit" className="bg-lime-600 text-white font-sans font-bold text-xl flex items-center gap-3 px-9 py-3 rounded-[30px] mt-7">
                    Entrar
                    <LogIn className="size-12"/>
                </button>
            </form>
        </main>
    )
}