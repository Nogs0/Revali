import { useState } from "react";
import InputMask from 'react-input-mask'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { toast } from "sonner";
import { api } from "../services/api";
import { Eye, EyeOff } from "lucide-react";


export function AddUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [type, setType] = useState('');
    // const [selectBanco, setSelectBanco] = useState<number>();

    const tipoUser = localStorage.getItem('tipo');
    const banco = localStorage.getItem("banco-alimentos-id")

    // const { data: bancoData, isError: isBancoError, isLoading: isBancoLoading } = useQuery("banco-list", getBanco);

    // const handleSelectBanco = (event: any) => {
    //     const value = event.target.value
    //     setSelectBanco(value)
    // }
    // const handleSelectType = (event: any) => {
    //     const value = event.target.value
    //     setType(value)
    // }
    const validaCPF = () => {
        const CPFWithOnlyNumbers = cpf.replace(/\D/g, "");

        if(!cpfValidator.isValid(CPFWithOnlyNumbers)){
            setCpf("");
            toast.error("CPF inválido");
            return false;
        }

        return true;
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async () => {
        console.info("CHEGOU ATE AQUI 1")
        if(!validaCPF()) return;
        console.info("CHEGOU ATE AQUI 2 ")
        const tipo = tipoUser === "0" ? 1 : 0;
        console.info("CHEGOU ATE AQUI 3")
        const payload = {
            name,
            cpf,
            banco_de_alimento_id: banco, // valor selecionado do banco de alimentos
            tipo: tipo,
            password,
            email,
        };


        try {
            await api.post("/register", payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            toast.success("Usuário cadastrado com sucesso");

            setName('')
            setEmail('')
            setCpf('')
            setPassword('')
        } catch (error: any) {
            toast.error("Erro ao cadastrar usuário", error);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center mt-28 bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-raleway-bold mb-4 text-center text-black">Adicionar novo usuário</h2>
                <div className=" grid grid-cols-2 gap-2 items-center">
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Nome <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">CPF <span className="text-red-500">*</span></label>
                        <InputMask
                            mask="999.999.999-99"
                            type="text"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Senha <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} 
                                required
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} className="text-gray-500" />
                                ) : (
                                    <Eye size={20} className="text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>
                    {/* <div>
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
                    </div> */}
                    {/* <div className="col-span-2">
                        <label className="block text-black font-inter font-medium text-sm">Banco de alimentos</label>
                        <select
                            className="w-full p-3  border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={selectBanco}
                            onChange={handleSelectBanco}
                            required
                        >
                            <option value=""></option>
                            {isBancoLoading && <option value="">Carregando...</option>}
                            {isBancoError && <option value="">Ocorreu um erro!</option>}
                            {bancoData?.map((banco) => (
                                <option value={banco.id}>{banco.nome}</option>
                            ))}

                        </select>
                    </div> */}
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        onClick={handleRegister}
                        className="bg-green-medium hover:bg-[#6C9965] text-white py-2 px-12 rounded-xl"
                    >
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    )
}