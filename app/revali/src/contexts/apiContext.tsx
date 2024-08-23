import { createContext, useContext } from "react";
import { useAppContext } from "./appContext";
import { api_url } from "../services/config-dev";
import { CreateResgate, Doacao, ExtratoDto, Movimentacoes, ProdutosResgate } from "../shared/Types";

interface ApiContextData {
    getItemParaCompra(id: number): Promise<any>,
    confirmarCompra(input: CreateResgate): Promise<void>,
    getMovimentacao(id: number): Promise<any>,
    getNotificacoes(): Promise<any[]>,
    getDoacoesEmAndamento(): Promise<Doacao[]>,
    getDoacao(id: number): Promise<any>,
    getProdutosParaCompra(): Promise<any>,
    getExtrato(): Promise<ExtratoDto>
}

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

function ApiProvider({ children }: any) {

    const { limparCarrinho, userId } = useAppContext();

    function getExtrato(): Promise<ExtratoDto> {
        return new Promise<ExtratoDto>((resolve, reject) => {
            fetch(`${api_url}/movimentacoes-extrato/${userId}`)
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
        console.log(JSON.stringify(input))
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
                    console.log(response)
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

    function getDoacao(id: number): Promise<Doacao> {
        return new Promise<Doacao>((resolve, reject) => {
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

    return (
        <ApiContext.Provider
            value={{
                getItemParaCompra,
                getMovimentacao,
                confirmarCompra,
                getNotificacoes,
                getDoacoesEmAndamento,
                getDoacao,
                getProdutosParaCompra,
                getExtrato
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