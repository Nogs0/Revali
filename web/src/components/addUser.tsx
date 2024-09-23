import { useState } from "react";
import InputMask from 'react-input-mask'
import { useQuery } from "react-query";
import { getBanco } from "../http/get-banco";
import axios from "axios";
import { toast } from "sonner";
import { api } from "../services/api";

export function AddUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [type, setType] = useState('');
    const [selectBanco, setSelectBanco] = useState<number>();

    const { data: bancoData, isError: isBancoError, isLoading: isBancoLoading } = useQuery("banco-list", getBanco);

    const handleSelectBanco = (event: any) => {
        const value = event.target.value
        setSelectBanco(value)
    }

    const handleSelectType = (event: any) => {
        const value = event.target.value
        setType(value)
    }

    const handleRegister = async () => {
        const payload = {
            name,
            cpf,
            banco_de_alimento_id: selectBanco, // valor selecionado do banco de alimentos
            tipo: Number(type),
            password,
            email,
        };

        try {
            await api.post('/register', payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            toast.success("Usuário cadastrado com sucesso");

            setName('')
            setEmail('')
            setCpf('')
            setPassword('')
            setType('')
        } catch (error) {
            toast.error("Erro ao cadastrar usuário");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center mt-28 bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-raleway-bold mb-4 text-center text-black">Adicionar novo usuário</h2>
                <div className=" grid grid-cols-2 gap-2 items-center">
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Tipo do usuário</label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 h-full outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={type}
                            onChange={handleSelectType}
                        >
                            <option value=""></option>
                            <option value={0}>Tipo 0</option>
                            <option value={1}>Tipo 1</option>
                            <option value={2}>Tipo 2</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-black font-inter font-medium text-sm">Banco de alimentos</label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={selectBanco}
                            onChange={handleSelectBanco}
                        >
                            <option value=""></option>
                            {isBancoLoading && <option value="">Carregando...</option>}
                            {isBancoError && <option value="">Ocorreu um erro!</option>}
                            {bancoData?.map((banco) => (
                                <option value={banco.id}>{banco.nome}</option>
                            ))}

                        </select>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        className="bg-green-medium hover:bg-[#6C9965] text-white py-2 px-12 rounded-xl"
                        onClick={handleRegister}
                    >
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    )
}