import { useState } from "react";
import InputMask from 'react-input-mask'

export function AddUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');


    return (
        <div className="flex flex-col items-center justify-center mt-28 bg-gray-100">
            <div className="bg-white shadow-md rounded-lg w-3/4 md:w-1/2 lg:w-1/3 p-6">
                <h2 className="text-2xl font-raleway-bold mb-4 text-center text-black">Adicionar novo usuário</h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Nome</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">CPF</label>
                        <InputMask
                            mask="999.999.999-99"
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Email</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Senha</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        className="bg-green-medium hover:bg-[#6C9965] text-white py-2 px-12 rounded-xl"
                    >
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    )
}