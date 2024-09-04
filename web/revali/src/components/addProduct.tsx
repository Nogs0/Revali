import { getCompany } from '../http/get-company';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { api } from '../services/api';
import { toast } from 'sonner';

export function AddProduct() {

    const [nomeProduto, setNomeProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [fornecedorId, setFornecedorId] = useState('');
    const [fornecedorNome, setFornecedorNome] = useState('');
    const [marca, setMarca] = useState('');
    const [descricao, setDescricao] = useState('');
    const [logo, setLogo] = useState<File | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const{ data: companyData, isError: isCompanyError, isLoading: isCompanyLoading } = useQuery("company-list", getCompany);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('nome', nomeProduto);
        formData.append('quantidade', quantidade);
        formData.append('valor', valor);
        formData.append('descricao', descricao);
        formData.append('marca', marca);
        formData.append('empresas_parceiras_id', fornecedorId);
        formData.append('fornecedor', fornecedorNome);
        if (logo) {
            formData.append('pastaDeFotos', logo);
        }

        try {
            const response = await api.post('/produtos-resgate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Produto cadastrado com sucesso!");
            setNomeProduto('');
            setQuantidade('');
            setValor('');
            setFornecedorId('');
            setMarca('');
            setDescricao('');
            setLogo(null);
        } catch (error) {
            console.error('Erro ao cadastrar a empresa:', error);
            toast.error("Erro ao cadastrar produto")
            console.log(nomeProduto);
            console.log(quantidade);
            console.log(valor);
            console.log(fornecedorNome);
            console.log(fornecedorId);
            console.log(marca);
            console.log(descricao);
        } finally {
            setIsLoading(false); // Finalizar o loading
        }
    };
    const handleInputName = (event: any) => {
        const value = event.target.value
        setNomeProduto(value);
    };
    const handleQuantity = (event: any) => {
        const value = event.target.value
        setQuantidade(value);
    };
    const handleInputValue = (event: any) => {
        const value = event.target.value
        setValor(value);
    };
    const handleSelectCompany = (event: any) => {
        const selectedId =  parseInt(event.target.value);
        setFornecedorId(selectedId.toString());
    
        const selectedCompany = companyData?.find(company => company.id === selectedId);
        if (selectedCompany) {
            setFornecedorNome(selectedCompany.nome_empresa);
        } else {
            setFornecedorNome('');
        }
    };
    const handleInputBrand = (event: any) => {
        const value = event.target.value
        setMarca(value);
    };
    const handleInputDescription = (event: any) => {
        const value = event.target.value
        setDescricao(value);
    };
    
    return (
        <>
            <h2 className="text-2xl font-semibold mb-6 px-6 pt-4">Adicionar novos produtos</h2>
            <div className="bg-white p-6 rounded-lg mx-6 max-h-80 tall:max-h-[580px] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Informações do produto</h3>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Nome do produto</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={nomeProduto}
                            onChange={handleInputName}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Quantidade</label>
                        <input
                            type="number"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={quantidade}
                            onChange={handleQuantity}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Valor (R$)</label>
                        <input
                            type="number"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={valor}
                            onChange={handleInputValue}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Fornecedor</label>
                        <select
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md font-inter font-medium text-sm text-black opacity-60  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={fornecedorId}
                            onChange={handleSelectCompany}
                        >
                            <option value="">Selecione um fornecedor</option>
                            {isCompanyLoading && <option value="">Carregando...</option>}
                            {isCompanyError && <option value="">Ocorreu um erro!</option>}
                            {companyData?.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.nome_empresa}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Marca</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                            value={marca}
                            required
                            onChange={handleInputBrand}
                        />
                    </div>


                    <div>
                        <label className="text-gray-700 font-inter font-medium text-sm">Imagem do produto</label>
                        <input
                            accept="image/png, image/jpeg, image/svg, image/svg+xml"
                            type="file"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            required
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setLogo(e.target.files[0]);
                                }
                            }}
                        />
                    </div>

                    <div className="md:col-span-3">
                        <label className="text-gray-700 font-inter font-medium text-sm">Descrição</label>
                        <textarea 
                        className="h-32 w-full p-2 border rounded resize-none align-top mt-1 outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                        value={descricao}
                        onChange={handleInputDescription}
                        required
                        ></textarea>
                    </div>


                    <div className="md:col-span-3">
                        <button
                            type="submit"
                            className="w-full bg-green-medium text-white py-2 px-4 rounded-md hover:bg-[#6C9965]"
                        >
                           {isLoading ? 'Adicionando...' : 'Adicionar produto'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}