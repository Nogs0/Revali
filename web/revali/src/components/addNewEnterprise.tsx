import { useState } from 'react';
import InputMask from 'react-input-mask';

import { api } from '../services/api';
import { toast } from 'sonner';


export function AddNewEnterprise() {
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [logo, setLogo] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('nome_empresa', nomeEmpresa);
        formData.append('cnpj', cnpj);
        formData.append('endereco', endereco);
        formData.append('email', email);
        formData.append('telefone', telefone);
        if (logo) {
            formData.append('pastaDeFotos', logo);
        }

        try {
            const response = await api.post('/empresas-parceiras', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNomeEmpresa('');
            setCnpj('');
            setEndereco('');
            setEmail('');
            setTelefone('');
            setLogo(null);
            toast.success("Empresa cadastrada com sucesso!")
        } catch (error) {
            console.error('Erro ao cadastrar a empresa:', error);
            toast.error("Erro ao cadastrar empresa")
        } finally {
            setIsLoading(false); // Finalizar o loading
        }
    };

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 px-6 pt-4">Registro de empresas parceiras</h2>
            <div className="bg-white p-6 rounded-lg mx-6 max-h-80 tall:max-h-96 overflow-y-auto tall:overflow-y-hidden">
                <h3 className="text-lg font-semibold mb-4">Informações da empresa</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Nome da Empresa</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={nomeEmpresa}
                            onChange={(e) => setNomeEmpresa(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">CNPJ</label>
                        <InputMask
                            mask="99.999.999/9999-99"
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Endereço</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Telefone</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            type="tel"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Logo da Empresa</label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/svg, image/svg+xml"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            required
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setLogo(e.target.files[0]);
                                }
                            }}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-green-medium text-white py-2 px-4 rounded-md hover:bg-[#6C9965]"
                        >
                            {isLoading ? 'Registrando...' : 'Registrar Empresa'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
