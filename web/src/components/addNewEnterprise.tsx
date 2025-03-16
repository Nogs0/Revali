import { useState } from 'react';
import InputMask from 'react-input-mask';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator'


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

    const validaCNPJ = () => {
        const CNPJWithOnlyNumbers = cnpj.replace(/\D/g, "");

        if(!cnpjValidator.isValid(CNPJWithOnlyNumbers)){
            setCnpj("");
            toast.error("CNPJ inválido");
            return false;
        }

        return true;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        if(!validaCNPJ()){
            setIsLoading(false);
            return;
        } 
    
        const formData = new FormData();
        formData.append('nome_empresa', nomeEmpresa);
        formData.append('cnpj', cnpj);
        formData.append('endereco', endereco);
        formData.append('email', email);
        formData.append('telefone', telefone);
        if (logo) {
            formData.append('pastaDeFotos', logo);
        }
    
        const accessToken = localStorage.getItem('token-validate');
    
        
        if (!accessToken) {
            console.error('Access token is not available');
            toast.error("Token de acesso não disponível.");
            setIsLoading(false);
            return; 
        }
    
        try {
            await api.post('/empresas-parceiras', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
    
            setNomeEmpresa('');
            setCnpj('');
            setEndereco('');
            setEmail('');
            setTelefone('');
            setLogo(null);
            toast.success("Empresa cadastrada com sucesso!");
        } catch (error) {
            console.error('Erro ao cadastrar a empresa:', error);
            toast.error("Erro ao cadastrar empresa");
        } finally {
            setIsLoading(false); 
        }
    };
    

    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 px-6 pt-4">Registro de empresas parceiras</h2>
            <div className="bg-white p-6 rounded-lg mx-6 max-h-96 tallForm:max-h-[580px] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Informações da empresa</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Nome da Empresa <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={nomeEmpresa}
                            onChange={(e) => setNomeEmpresa(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">CNPJ <span className="text-red-500">*</span></label>
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
                        <label className="text-gray-700 font-inter font-medium text-sm">Endereço <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Telefone <span className="text-red-500">*</span></label>
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
                        <label className="text-gray-700 font-inter font-medium text-sm">Logo da Empresa <span className="text-red-500">*</span></label>
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
