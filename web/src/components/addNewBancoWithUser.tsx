import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { api } from '../services/api'; 
import { toast } from "sonner";

export function AddNewBancoWithUser() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        nome_usuario: '',
        cpf: '',
        email: '',
        senha: '',
        nome: '',
        cnpj: '',
        cep: '',
        endereco: '',
        telefone: '',
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await api.post("/bancos-de-alimentos-com-usuario", formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            toast.success("Usuário cadastrado com sucesso");
            setFormData({
                nome_usuario: '',
                cpf: '',
                email: '',
                senha: '',
                nome: '',
                cnpj: '',
                cep: '',
                endereco: '',
                telefone: '',
            });
        } catch (error: any) {
            toast.error("Erro ao cadastrar usuário");
        }
    };

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 px-6 pt-4">Registro de banco de alimentos</h2>
            <div className="bg-white p-6 rounded-lg mx-6 max-h-96 tallForm:max-h-[580px] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Informações do usuário</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-700 font-medium text-sm">Nome do usuário <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="nome_usuario"
                            value={formData.nome_usuario}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-medium text-sm">CPF <span className="text-red-500">*</span></label>
                        <InputMask
                            mask="999.999.999-99"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-medium text-sm">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="text-gray-700 font-medium text-sm">Senha <span className="text-red-500">*</span></label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 bottom-1"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeOff size={20} className="text-gray-500" /> : <Eye size={20} className="text-gray-500" />}
                        </button>
                    </div>
                    <div className='bg-gray-200 h-px mt-11 col-span-2'></div>
                    <h3 className='text-lg font-semibold mb-4 col-span-2'>Informações do banco de alimentos</h3>
                    <div>
                        <label className="text-gray-700 font-medium text-sm">Nome <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-medium text-sm">CNPJ <span className="text-red-500">*</span></label>
                        <InputMask
                            mask="99.999.999/9999-99"
                            name="cnpj"
                            value={formData.cnpj}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2"
                            required
                        />
                    </div>
                    <div className='grid grid-cols-3 gap-4 col-span-2'>
                        <div>
                            <label className="text-gray-700 font-medium text-sm">CEP <span className="text-red-500">*</span></label>
                            <InputMask
                                mask="99999-999"
                                name="cep"
                                value={formData.cep}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 font-medium text-sm">Endereço <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 font-medium text-sm">Telefone <span className="text-red-500">*</span></label>
                            <InputMask
                                mask="(99) 99999-9999"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2"
                                required
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <button type="button" onClick={handleSubmit} className="w-full bg-green-medium text-white py-2 px-4 rounded-md hover:bg-[#6C9965]">Cadastrar</button>
                    </div>
                </form>
            </div>
        </>
    );
}
