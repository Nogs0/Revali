import revaliLogo from "../assets/revali-logo.svg"
import { useNavigate } from 'react-router-dom'
import { FormEvent } from "react";
import { Button } from "../components/button";


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
        <main className=" bg-lime-900 h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className='bg-gray-300 w-[706px] h-[694px] rounded-lg flex flex-col py-7 items-center shadow-shape'>
                <img src={revaliLogo} alt="alt" className="h-52"/>

                <input type="email" required name="email" placeholder="Email" className="w-[466px] mx-28 my-7 px-9 py-6 rounded-lg text-xl font-bold font-sans placeholder-black placeholder-opacity-60 outline-none ring-lime-600 ring-offset-3 ring-offset-slate-100 focus-within:ring-2"/>
                <input type="password" required name="password" placeholder="Senha" className="w-[466px] mx-28 px-9 py-6 rounded-lg text-xl font-bold font-sans placeholder-black placeholder-opacity-60 outline-none  ring-lime-600 ring-offset-3 ring-offset-slate-100 focus-within:ring-2"/>

                <Button type="submit" variant="primary" login>Entrar</Button>
            </form>
        </main>
    )
}