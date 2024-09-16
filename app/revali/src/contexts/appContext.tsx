import { createContext, useContext, useState } from "react";
import { DadosDoadorLogado } from "../shared/Types";
import { showMessage } from "react-native-flash-message";

export type buttonType = {
    text: string,
    onPress: () => any
}

export interface ItemCarrinho {
    id: number,
    imagem: any,
    nome: string,
    marca: string,
    fornecedor: string,
    valor: number,
    quantidade?: number,
    quantidadeExistente: number
}
interface AppContextData {
    addItemCarrinho(item: ItemCarrinho): void,
    addItemDiretoCarrinho(id: number): void,
    removeItemCarrinho(id: number): void,
    limparCarrinho(): void,
    itensCarrinho: ItemCarrinho[],
    qtdItensCarrinho: number,
    totalCarrinho: number,
    setDadosUser: React.Dispatch<React.SetStateAction<DadosDoadorLogado>>,
    dadosUser: DadosDoadorLogado,
    dataExtrato: Date,
    setDataExtrato: React.Dispatch<React.SetStateAction<Date>>,
    retornaEstadoInicial(): void
}

const AppContext = createContext<AppContextData>({} as AppContextData);

function AppProvider({ children }: any) {

    const [dataExtrato, setDataExtrato] = useState<Date>(new Date());
    const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);
    const [qtdItensCarrinho, setQtdItensCarrinho] = useState<number>(0);
    const [totalCarrinho, setTotalCarrinho] = useState<number>(0);
    const [dadosUser, setDadosUser] = useState<DadosDoadorLogado>({} as DadosDoadorLogado);

    function retornaEstadoInicial() {
        setDataExtrato(new Date());
        setItensCarrinho([]);
        setQtdItensCarrinho(0);
        setTotalCarrinho(0);
        setDadosUser({} as DadosDoadorLogado)
    }

    function addItemCarrinho(item: ItemCarrinho) {
        setItensCarrinho((prev) => {
            //ja existe no carrinho
            let index = prev.findIndex(x => x.id == item.id)
            if (index != -1) {
                if (prev[index].quantidade == null || prev[index].quantidade < item.quantidadeExistente) {
                    prev[index].quantidade ? prev[index].quantidade += 1 : prev[index].quantidade = 1;
                    setTotalCarrinho(prev => prev + item.valor)
                    setQtdItensCarrinho(prev => prev + 1)
                } else {
                    showMessage({
                        message: `Este produto tem apenas ${item.quantidadeExistente}un em estoque!`,
                        type: 'warning'
                    })
                }
                return [...prev]
            }
            else {
                item.quantidade = 1;
                setTotalCarrinho(prev => prev + item.valor)
                setQtdItensCarrinho(prev => prev + 1)
                return [...prev, item]
            }
        })
    }

    function removeItemCarrinho(id: number) {
        let index = itensCarrinho.findIndex(x => x.id == id)
        if (index != -1) {
            let item = itensCarrinho[index];
            setTotalCarrinho(prev => prev - item.valor)
            setQtdItensCarrinho(prev => prev - 1)

            if (item.quantidade && item.quantidade > 1)
                setItensCarrinho(prev => {
                    prev[index].quantidade ? prev[index].quantidade -= 1 : prev[index].quantidade = 0;
                    return [...prev]
                })
            else
                setItensCarrinho((prev) => {
                    prev.splice(index, 1);
                    return [...prev];
                })
        }
    }

    function addItemDiretoCarrinho(id: number) {
        let index = itensCarrinho.findIndex(x => x.id == id)
        if (index != -1) {
            let item = itensCarrinho[index];
            if ((item.quantidade == null && item.quantidadeExistente > 0) ||
                (item.quantidade != null && item.quantidade < item.quantidadeExistente)) {
                setTotalCarrinho(prev => prev + item.valor)
                setQtdItensCarrinho(prev => prev + 1)

                if (item.quantidade)
                    setItensCarrinho(prev => {
                        prev[index].quantidade ? prev[index].quantidade += 1 : prev[index].quantidade = 1;
                        return [...prev]
                    })
            }
            else {
                showMessage({
                    message: `Este produto tem apenas ${item.quantidadeExistente}un em estoque!`,
                    type: 'warning'
                })
            }
        }
    }

    function limparCarrinho() {
        setItensCarrinho([])
        setQtdItensCarrinho(0)
        setTotalCarrinho(0)
    }


    return <AppContext.Provider
        value={{
            dataExtrato,
            setDataExtrato,
            setDadosUser,
            dadosUser,
            addItemCarrinho,
            addItemDiretoCarrinho,
            removeItemCarrinho,
            limparCarrinho,
            itensCarrinho,
            qtdItensCarrinho,
            totalCarrinho,
            retornaEstadoInicial
        }}>
        {children}
    </AppContext.Provider>
}

function useAppContext() {
    const context = useContext(AppContext);

    if (!context)
        throw new Error('useAppContext must be used with AppProvider');

    return context;
}

export { AppProvider, useAppContext }