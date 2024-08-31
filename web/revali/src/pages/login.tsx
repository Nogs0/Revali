
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
        <main className=" bg-green-dark h-screen p-6 flex flex-col gap-2 items-center justify-center md:grid md:grid-cols-2 md:gap-20">
             <div className="col-span-1 flex items-center justify-center gap-2 ml-[-40px] md:ml-0 md:gap-4">
                <img src={revaliLogo} alt="RevaliLogo" className="size-36 md:size-44"/>
                <h1 className="font-ltrenovate-bold text-white text-5xl md:text-6xl">REVALI</h1>
             </div>
             <div className="col-span-1 flex items-center justify-center">
                <form onSubmit={handleSubmit} className='bg-green-medium w-[406px] h-[394px] tall:w-[706px] tall:h-[694px] rounded-2xl flex flex-col py-7 items-center shadow-shape'>
                    <h1 className="font-raleway-medium text-white text-2xl tall:text-4xl my-2 tall:my-10 ">Faça login</h1>
                    <div className="flex flex-col gap-2 my-3 tall:my-7">
                        <label htmlFor="email" className="text-white font-raleway-bold text-sm tall:text-base">Email</label>
                        <input type="email" id="email" required name="email" placeholder="exemplo@exemplo.com" className="w-[294px] tall:w-[466px] px-4 tall:px-5 py-3 tall:py-5 rounded-lg text-lg tall:text-xl  font-raleway-bold placeholder-black placeholder:text-sm placeholder-opacity-40 outline-none ring-[#305742] ring-offset-3 ring-offset-slate-100 focus-within:ring-2" />
                    </div>

                    <div className="flex flex-col gap-2 my-3 tall:mb-7">
                        <label htmlFor="password" className="text-white font-raleway-bold text-sm tall:text-base">Senha</label>
                        <input type="password" required name="password" placeholder="No mínimo 8 caracteres" className="w-[294px] tall:w-[466px] px-4 tall:px-5 py-3 tall:py-5 rounded-lg text-lg tall:text-xl  font-raleway-bold placeholder-black placeholder:text-sm placeholder-opacity-40 outline-none ring-[#305742] ring-offset-3 ring-offset-slate-100 focus-within:ring-2" />
                    </div>
                    <Button type="submit" variant="primary" login>Entrar</Button>
                </form>
             </div>                                                                 
        </main>
    )
}