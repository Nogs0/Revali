
import revaliLogo from "../assets/revali-logo.svg"
import { useNavigate } from 'react-router-dom'
import { FormEvent } from "react";
import { Button } from "../components/button";
import { toast } from 'sonner'



export function Login() {

    const navigate = useNavigate()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const userInfo = new FormData(event.currentTarget)
        const email = userInfo.get('email')?.toString()
        const password = userInfo.get('password')?.toString()
        // let userFound = false

        if (!email || !password) {
            return
        }

        // try {
        //     const response = await fetch("http://127.0.0.1:8000/api/users",
        //         {
        //             method: "GET"
        //         }
        //     )

        //     const data = await response.json()

        //     data.map((x: { email: string; password: string; }) => {
        //         if(x.email === email && x.password === password){
        //             userFound = true
                    
        //         }
        //     })

        //     if(userFound){
        //         navigate('/homepage')
        //     } else {
        //         toast.error('Email ou senha incorreto')
        //     }
            

        // } catch (error) {
        //     toast.error('Não foi possivel realizar seu login, entre em contado com o suporte')
        // }

        navigate('/homepage')


    }


    return (
        <main className=" bg-green-dark h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className='bg-gray-300 w-[406px] h-[394px] tall:w-[706px] tall:h-[694px] rounded-lg flex flex-col py-7 items-center shadow-shape'>
                <img src={revaliLogo} alt="alt" className="h-32 tall:h-52" />

                <input type="email" required name="email" placeholder="Email" className="w-[294px] tall:w-[466px] mx-28 my-3 tall:my-7 px-4 tall:px-9 py-3 tall:py-6 rounded-lg text-lg tall:text-xl  font-raleway-bold placeholder-black placeholder-opacity-60 outline-none ring-[#305742] ring-offset-3 ring-offset-slate-100 focus-within:ring-2" />
                <input type="password" required name="password" placeholder="Senha" className="w-[294px] tall:w-[466px] mx-28 px-4 tall:px-9 py-3 tall:py-6 rounded-lg text-lg tall:text-xl  font-raleway-bold placeholder-black placeholder-opacity-60 outline-none  ring-[#305742] ring-offset-3 ring-offset-slate-100 focus-within:ring-2" />

                <Button type="submit" variant="primary" login>Entrar</Button>
            </form>
        </main>
    )
}