import { getCompany } from '../http/get-company';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { api } from '../services/api';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { getProductRescue } from '../http/get-products-rescue';

export function AddProduct() {

    const [nomeProduto, setNomeProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [fornecedorId, setFornecedorId] = useState('');
    const [fornecedorNome, setFornecedorNome] = useState('');
    const [marca, setMarca] = useState('');
    const [descricao, setDescricao] = useState('');
    const [logo, setLogo] = useState<File | null>(null);

    const [updateProduct, setUpdateProductModal] = useState(false);
    const [nomeProdutoAtualizado, setNomeProdutoAtualizado] = useState('');
    const [quantidadeAtualizada, setQuantidadeAtualizada] = useState('');
    const [valorAtualizado, setValorAtualizado] = useState('');
    const [fornecedorIdAtualizado, setFornecedorIdAtualizado] = useState('');
    const [fornecedorNomeAtualizado, setFornecedorNomeAtualizado] = useState('');
    const [marcaAtualizada, setMarcaAtualizada] = useState('');
    const [descricaoAtualizado, setDescricaoAtualizado] = useState('');
    const [selectProduct, setSelectProduct] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const { data: companyData, isError: isCompanyError, isLoading: isCompanyLoading } = useQuery("company-list", getCompany);
    const { data: productRescueData, isError: isProductRescueError, isLoading: isProductRescueLoading , refetch } = useQuery("product-rescue-list", getProductRescue);

    function openUpdateProductModal() {
        setUpdateProductModal(true)
    }

    function closeUpdateProductModal() {
        setUpdateProductModal(false)
    }
    const handleSelectChange = (event: any) => {
        const value = event.target.value
        setSelectProduct(value)

    }
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

        const accessToken = localStorage.getItem('token-validate');

        if (!accessToken) {
            console.error('Access token is not available');
            toast.error("Token de acesso não disponível.");
            setIsLoading(false);
            return;
        }

        try {
            await api.post('/produtos-resgate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
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
            toast.error("Erro ao cadastrar produto");
        } finally {
            setIsLoading(false);
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
        const selectedId = parseInt(event.target.value);
        setFornecedorId(selectedId.toString());

        const selectedCompany = companyData?.find(company => company.id === selectedId);
        if (selectedCompany) {
            setFornecedorNome(selectedCompany.nome_empresa);
        } else {
            setFornecedorNome('');
        }
    };
    const handleSelectCompanyUpdated = (event: any) => {
        const selectedId = parseInt(event.target.value);
        setFornecedorIdAtualizado(selectedId.toString());

        const selectedCompany = companyData?.find(company => company.id === selectedId);
        if (selectedCompany) {
            setFornecedorNomeAtualizado(selectedCompany.nome_empresa);
        } else {
            setFornecedorNomeAtualizado('');
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


    const handleUpdateProduct = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const id = Number(selectProduct)

        const payload: any = {};

        if (nomeProdutoAtualizado) {
            payload.nome = nomeProdutoAtualizado;
        }
        if (quantidadeAtualizada) {
            payload.quantidade = Number(quantidadeAtualizada);
        }
        if (valorAtualizado) {
            payload.valor = Number(valorAtualizado);
        }
        if (descricaoAtualizado) {
            payload.descricao = descricaoAtualizado;
        }
        if (marcaAtualizada) {
            payload.marca = marcaAtualizada;
        }
        if (fornecedorIdAtualizado) {
            payload.empresas_parceiras_id = fornecedorIdAtualizado;
            payload.fornecedor = fornecedorNomeAtualizado;
        }


        const accessToken = localStorage.getItem('token-validate');
        if (!accessToken) {
            console.error('Access token is not available');
            toast.error("Token de acesso não disponível.");
            setIsLoading(false);
            return;
        }

        try {
            await api.put(`/produtos-resgate/${id}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            toast.success("Produto atualizado com sucesso!");

            setNomeProdutoAtualizado('');
            setQuantidadeAtualizada('');
            setValorAtualizado('');
            setFornecedorIdAtualizado('');
            setMarcaAtualizada('');
            setDescricaoAtualizado('');

            refetch();

        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
            toast.error("Erro ao atualizar produto");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className='flex'>
                <h2 className="text-2xl font-semibold mb-6 px-6 pt-4">Adicionar novos produtos</h2>
                <button
                    className="bg-green-medium hover:bg-[#6C9965] text-white text-sm font-raleway-semibold tracking-tight px-3 my-4 rounded-lg"
                    onClick={openUpdateProductModal}
                >
                    Atualizar produtos
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg mx-6 max-h-96 tallForm:max-h-[580px] overflow-y-auto">
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

                {updateProduct && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                        <div className="w-[586px] rounded-xl py-5 px-6 shadow-shape bg-zinc-100 space-y-5">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold mb-4">Atualizar produtos</h2>
                                    <button onClick={closeUpdateProductModal}>
                                        <X className="size-5 text-zinc-400 hover:text-zinc-500" />
                                    </button>
                                </div>
                                <form onSubmit={handleUpdateProduct} autoComplete="off" className="grid grid-cols-2 gap-2">
                                    <select
                                        className="w-full col-span-2 p-3 border border-gray-300 rounded font-inter font-medium text-sm text-black opacity-60 outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                                        value={selectProduct}
                                        onChange={handleSelectChange}
                                    >
                                        <option value="">Selecione um produto</option>
                                        {isProductRescueLoading && <option value="">Carregando...</option>}
                                        {isProductRescueError && <option value="">Ocorreu um erro!</option>}
                                        {productRescueData?.map((product) => (
                                            <option key={product.id} value={product.id}>{product.nome}</option>
                                        ))}

                                    </select>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nome do produto"
                                        className="px-4 py-3 border rounded outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                                        value={nomeProdutoAtualizado}
                                        onChange={(e) => setNomeProdutoAtualizado(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        name="quantidade"
                                        placeholder="Quantidade"
                                        className="px-4 py-3 border rounded outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                                        value={quantidadeAtualizada}
                                        onChange={(e) => setQuantidadeAtualizada(e.target.value)}
                                    />
                                    <select
                                        className="w-full col-span-2 mt-1 p-2 border border-gray-300 rounded-md font-inter font-medium text-sm text-black opacity-60  outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                                        value={fornecedorIdAtualizado}
                                        onChange={handleSelectCompanyUpdated}
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
                                    <input
                                        type="text"
                                        name="marca"
                                        placeholder="Marca"
                                        className="px-4 py-3 border rounded outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                                        value={marcaAtualizada}
                                        onChange={(e) => setMarcaAtualizada(e.target.value)}
                                    />
                                      <input
                                        type="number"
                                        name="valor"
                                        placeholder="Valor"
                                        className="px-4 py-3 border rounded outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                                        value={valorAtualizado}
                                        onChange={(e) => setValorAtualizado(e.target.value)}
                                    />
                                    <textarea
                                        className="col-span-2 h-32 w-full p-2 border rounded resize-none align-top mt-1 outline-none ring-green-medium ring-offset-3 ring-offset-slate-100 focus-within:ring-2"
                                        placeholder='Descrição'
                                        value={descricaoAtualizado}
                                        onChange={(e) => setDescricaoAtualizado(e.target.value)}
                                    ></textarea>

                                    <button
                                        type="submit"
                                        className="mt-6 col-span-2 bg-green-medium hover:bg-[#6C9965] text-white py-3 rounded flex justify-center items-center text-sm font-raleway-semibold tracking-tight"

                                    >
                                        {isLoading ? 'Atualizando...' : `Atualizar`}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}