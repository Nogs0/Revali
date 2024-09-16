import { createContext, useContext } from "react";
import { useAppContext } from "./appContext";
import { CreateResgate, DadosDoadorLogado, Doacao, DoacaoDetalhada, ExtratoDto, Movimentacoes, ProdutosResgate, RankingDoadoresDto, RankingEmpresasDto } from "../shared/Types";
import { useAuthContext } from "./authContext";

const api_url = "http://18.223.249.81:8080/api";

interface ApiContextData {
    getItemParaCompra(id: number): Promise<ProdutosResgate>,
    confirmarCompra(input: CreateResgate): Promise<void>,
    getMovimentacao(id: number): Promise<any>,
    getNotificacoes(): Promise<any[]>,
    getDoacoesEmAndamento(): Promise<Doacao[]>,
    getDoacao(id: number): Promise<any>,
    getProdutosParaCompra(search: string | undefined, menorPreco: boolean, maiorPreco: boolean, maisVendidos: boolean): Promise<any>,
    getExtrato(date: string): Promise<ExtratoDto>,
    getDadosUsuarioLogado(): Promise<DadosDoadorLogado>,
    getRankingEmpresasParceiras(): Promise<RankingEmpresasDto[]>,
    getRankingDoadores(): Promise<RankingDoadoresDto[]>,
    updateUser(email: string, name: string): Promise<void>
}

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

function ApiProvider({ children }: any) {

    const { token } = useAuthContext();
    const { limparCarrinho, dadosUser } = useAppContext();

    function updateUser(email: string, name: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fetch(`${api_url}/users/${dadosUser.user.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type for JSON
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        email,
                        name
                    }),
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    if (result.message) {
                        reject();
                        return;
                    }

                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    function getRankingEmpresasParceiras(): Promise<RankingEmpresasDto[]> {
        return new Promise<RankingEmpresasDto[]>((resolve, reject) => {
            fetch(`${api_url}/empresas-parceiras-ranking`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
                .then((response) => {
                    resolve(response.json())
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    function getRankingDoadores(): Promise<RankingDoadoresDto[]> {
        return new Promise<RankingDoadoresDto[]>((resolve, reject) => {
            fetch(`${api_url}/doador-ranking`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    resolve(response.json())
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    function getExtrato(date: string): Promise<ExtratoDto> {
        return new Promise<ExtratoDto>((resolve, reject) => {
            fetch(`${api_url}/movimentacoes-extrato/${dadosUser?.doador_id}?data=${date}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
                .then((response) => {
                    resolve(response.json())
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    function getMovimentacao(id: number): Promise<Movimentacoes> {
        return new Promise<Movimentacoes>((resolve, reject) => {
            fetch(`${api_url}/movimentacoes-extrato-detalhado/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => response.json())
                .then((result) => {
                    if (result.message != null)
                        throw new Error();
                    else resolve(result)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    function getItemParaCompra(id: number): Promise<ProdutosResgate> {
        return new Promise<ProdutosResgate>((resolve, reject) => {
            fetch(`${api_url}/produtos-resgate/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    resolve(response.json())
                })
                .catch((e) => {
                    reject(e);
                })
        })
    }

    function confirmarCompra(input: CreateResgate): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch(`${api_url}/salvar-resgate`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type for JSON
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(input)
                })
                .then((response) => {
                    limparCarrinho()
                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    function getNotificacoes(): Promise<any[]> {
        return new Promise<any>((resolve) => {
            resolve([
                {
                    titulo: 'Novidades no mercado',
                    conteudo: 'Novos itens chegaram ao nosso mercado! Venha conferir!',
                    tela: 1,
                    data: '12/07/2024',
                    id: null
                },
                {
                    titulo: 'Nova doação registrada',
                    conteudo: 'Sua doação foi registrada e logo será validada! Venha acompanhar!',
                    tela: 2,
                    data: '12/07/2024',
                    id: 1
                },
            ])
        })
    }

    function getDoacoesEmAndamento(): Promise<Doacao[]> {
        return new Promise<Doacao[]>((resolve, reject) => {
            fetch(`${api_url}/doacoes-em-andamento-user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    resolve(response.json())
                })
                .catch((e) => {
                    reject(e);
                })
        })
    }

    function getDoacao(id: number): Promise<DoacaoDetalhada> {
        return new Promise<DoacaoDetalhada>((resolve, reject) => {
            fetch(`${api_url}/doacoes-itens/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
                .then((response) => {
                    resolve(response.json())
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    function getProdutosParaCompra(search: string | undefined, menorPreco: boolean, maiorPreco: boolean, maisVendidos: boolean): Promise<ProdutosResgate[]> {
        return new Promise<ProdutosResgate[]>((resolve, reject) => {
            fetch(`${api_url}/produtos-resgate-filtro`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', // Specify the content type for JSON
                    },
                    body: JSON.stringify({
                        nome: search,
                        menor_preco: menorPreco,
                        maior_preco: maiorPreco,
                        mais_vendidos: maisVendidos
                    })
                })
                .then((response) => {
                    resolve(response.json())
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    function getDadosUsuarioLogado(): Promise<DadosDoadorLogado> {
        return new Promise<DadosDoadorLogado>((resolve, reject) => {
            fetch(`${api_url}/doador-dados`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
                .then((response) => {
                    resolve(response.json())
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    return (
        <ApiContext.Provider
            value={{
                updateUser,
                getRankingEmpresasParceiras,
                getRankingDoadores,
                getItemParaCompra,
                getMovimentacao,
                confirmarCompra,
                getNotificacoes,
                getDoacoesEmAndamento,
                getDoacao,
                getProdutosParaCompra,
                getExtrato,
                getDadosUsuarioLogado
            }}>
            {children}
        </ApiContext.Provider>
    )
}


function useApiContext() {
    const context = useContext(ApiContext);

    if (!context)
        throw new Error('useApiContext must be used with AppProvider');

    return context;
}

export { ApiProvider, useApiContext }