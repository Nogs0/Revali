import { createContext, useContext } from "react";
import { useAppContext } from "./appContext";
import { api_url } from "../services/config-dev";
import { CreateResgate, DadosDoadorLogado, Doacao, DoacaoDetalhada, ExtratoDto, Movimentacoes, ProdutosResgate, RankingDoadoresDto, RankingEmpresasDto } from "../shared/Types";
import { useAuthContext } from "./authContext";

interface ApiContextData {
    getItemParaCompra(id: number): Promise<ProdutosResgate>,
    confirmarCompra(input: CreateResgate): Promise<void>,
    getMovimentacao(id: number): Promise<any>,
    getNotificacoes(): Promise<any[]>,
    getDoacoesEmAndamento(): Promise<Doacao[]>,
    getDoacao(id: number): Promise<any>,
    getProdutosParaCompra(): Promise<any>,
    getExtrato(date: string): Promise<ExtratoDto>,
    getDadosUsuarioLogado(): Promise<DadosDoadorLogado>,
    getRankingEmpresasParceiras(): Promise<RankingEmpresasDto[]>,
    getRankingDoadores(): Promise<RankingDoadoresDto[]>
}

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

function ApiProvider({ children }: any) {

    const { token } = useAuthContext();
    const { limparCarrinho, dadosUser } = useAppContext();

    function getRankingEmpresasParceiras(): Promise<RankingEmpresasDto[]> {
        return new Promise<RankingEmpresasDto[]>((resolve, reject) => {
            fetch(`${api_url}/empresas-parceiras-ranking`)
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
            fetch(`${api_url}/doador-ranking`)
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
            fetch(`${api_url}/movimentacoes-extrato/${dadosUser?.doador_id}?data=${date}`)
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
            fetch(`${api_url}/movimentacoes-extrato-detalhado/${id}`)
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
            fetch(`${api_url}/produtos-resgate/${id}`)
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
            fetch(`${api_url}/doacoes-em-andamento`)
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
            fetch(`${api_url}/doacoes-itens/${id}`)
                .then((response) => {
                    resolve(response.json())
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    function getProdutosParaCompra(): Promise<ProdutosResgate[]> {
        return new Promise<ProdutosResgate[]>((resolve, reject) => {
            fetch(`${api_url}/produtos-resgate`, { method: 'GET' })
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