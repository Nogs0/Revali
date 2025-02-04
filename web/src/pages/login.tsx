import revaliLogo from "/revali-logo.png";
import { FormEvent, useState } from "react";
import { Button } from "../components/button";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";




export function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await login(email, password);
            navigate('/homepage');  
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            
        }
          
    };

    return (
        <main className=" bg-green-dark h-screen px-6 flex flex-col items-center justify-center md:grid md:grid-cols-2 md:gap-20">
            <div className="col-span-1 flex items-center justify-center">
                <img src={revaliLogo} alt="RevaliLogo" className="size-60 md:size-[650px]"/>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <form onSubmit={handleSubmit} className='bg-green-medium w-[406px] h-[394px] tall:w-[706px] tall:h-[694px] rounded-2xl flex flex-col py-7 items-center shadow-shape'>
                    <h1 className="font-raleway-bold text-white text-2xl tall:text-4xl my-2 tall:my-10">Acesse sua conta</h1>
                    <div className="flex flex-col gap-2 my-3 tall:my-7 mx-4">
                        <label htmlFor="email" className="text-white font-raleway-regular text-sm tall:text-base">Email</label>
                        <input type="email" id="email" required name="email" placeholder="exemplo@exemplo.com" onChange={(e) => setEmail(e.target.value)} className="w-[294px] tall:w-[466px] px-4 tall:px-5 py-3 tall:py-5 rounded-lg text-lg tall:text-xl font-raleway-bold placeholder-black placeholder:text-sm placeholder-opacity-40 outline-none ring-[#305742] ring-offset-3 ring-offset-slate-100 focus-within:ring-2" />
                    </div>

                    <div className="flex flex-col gap-2 my-3 tall:mb-7 mx-4">
                        <label htmlFor="password" className="text-white font-raleway-regular text-sm tall:text-base">Senha</label>
                        <input type="password" required name="password" placeholder="No mínimo 8 caracteres" onChange={(e) => setPassword(e.target.value)} className="w-[294px] tall:w-[466px] px-4 tall:px-5 py-3 tall:py-5 rounded-lg text-lg tall:text-xl font-raleway-bold placeholder-black placeholder:text-sm placeholder-opacity-40 outline-none ring-[#305742] ring-offset-3 ring-offset-slate-100 focus-within:ring-2" />
                    </div>
                    <Button type="submit" variant="primary" login>Entrar</Button>
                </form>
            </div>
        </main>
    );
}
