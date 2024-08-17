import { createContext, useContext } from "react";
import { useAppContext } from "./appContext";

interface ApiContextData {
    getItemParaCompra(id: number): Promise<any>,
    confirmarCompra(itensDoCarrinho: any[]): Promise<any>,
    getMovimentacao(id: number): Promise<any>,
    getNotificacoes(): Promise<any[]>,
    getDoacoesEmAndamento(): Promise<any[]>,
    getDoacao(id: number): Promise<any>
}

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

function ApiProvider({ children }: any) {

    const { limparCarrinho } = useAppContext();

    function getMovimentacao(id: number): Promise<any> {
        return new Promise((resolve) => {
            resolve({
                isEntrada: true,
                data: '12/08/2024',
                origem: 'Banco de Alimentos de Poços de Caldas',
                pontos: 2400,
                quantidade: 4,
                unidade: 'kg',
                itens: [
                    {
                        imagem: require('../../assets/images/favicon.png'),
                        nome: 'Tomate Andrea',
                        quantidade: 2,
                        unidade: 'kg',
                        classe: 'A',
                        pontos: 1200
                    },
                    {
                        imagem: require('../../assets/images/favicon.png'),
                        nome: 'Tomate Andrea',
                        quantidade: 2,
                        unidade: 'kg',
                        classe: 'A',
                        pontos: 1200
                    }
                ]
            })
        })
    }

    function getItemParaCompra(id: number): Promise<any> {
        return new Promise((resolve) => {
            resolve({
                nome: "Enxada para horta",
                fornecedor: "AgroPuc",
                marca: "VONDER",
                imagens: [require("../../assets/images/icon.png"), require("../../assets/images/favicon.png"), require("../../assets/images/icon.png"), require("../../assets/images/icon.png")],
                descricao: "Lorem ipsun dolorLorem ipsun dolorLorem ipsun dolorLorem ipsun dolorLorem ipsun dolorLorem ipsun dolorLorem ipsun dolorLorem ",
                valor: 1500
            })
        })
    }

    function confirmarCompra(itensDoCarrinho: any[]): Promise<any> {
        return new Promise<any>((resolve) => {
            limparCarrinho()
            resolve({});
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

    function getDoacoesEmAndamento(): Promise<any[]> {
        return new Promise<any>((resolve) => {
            resolve([
                {
                    pontos: 2400,
                    origem: 'Banco de alimentos de Poços de Caldas',
                    data: '12/08/2024',
                    id: 1
                }
            ])
        })
    }

    function getDoacao(id: number): Promise<any> {
        return new Promise<any>((resolve) => {
            resolve({
                data: '12/08/2024',
                origem: 'Banco de Alimentos de Poços de Caldas',
                pontos: 2400,
                quantidade: 4,
                unidade: 'kg',
                status: 'Aguardando aprovação',
                itens: [
                    {
                        imagem: require('../../assets/images/favicon.png'),
                        nome: 'Tomate Andrea',
                        quantidade: 2,
                        unidade: 'kg',
                        classe: 'A',
                        pontos: 1200
                    },
                    {
                        imagem: require('../../assets/images/favicon.png'),
                        nome: 'Tomate Andrea',
                        quantidade: 2,
                        unidade: 'kg',
                        classe: 'A',
                        pontos: 1200
                    },
                    {
                        imagem: require('../../assets/images/favicon.png'),
                        nome: 'Tomate Andrea',
                        quantidade: 2,
                        unidade: 'kg',
                        classe: 'A',
                        pontos: 1200
                    },
                    {
                        imagem: require('../../assets/images/favicon.png'),
                        nome: 'Tomate Andrea',
                        quantidade: 2,
                        unidade: 'kg',
                        classe: 'A',
                        pontos: 1200
                    },
                    {
                        imagem: require('../../assets/images/favicon.png'),
                        nome: 'Tomate Andrea',
                        quantidade: 2,
                        unidade: 'kg',
                        classe: 'A',
                        pontos: 1200
                    },
                    {
                        imagem: require('../../assets/images/favicon.png'),
                        nome: 'Tomate Andrea',
                        quantidade: 2,
                        unidade: 'kg',
                        classe: 'A',
                        pontos: 1200
                    }
                ]
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
                getDoacao
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