import { createContext, useContext, useState } from "react";
import { DadosDoadorLogado } from "../shared/Types";

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
    quantidade?: number
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
    dadosUser: DadosDoadorLogado
}

const AppContext = createContext<AppContextData>({} as AppContextData);

function AppProvider({ children }: any) {

    const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);
    const [qtdItensCarrinho, setQtdItensCarrinho] = useState<number>(0);
    const [totalCarrinho, setTotalCarrinho] = useState<number>(0);
    const [dadosUser, setDadosUser] = useState<DadosDoadorLogado>({} as DadosDoadorLogado);

    function addItemCarrinho(item: ItemCarrinho) {
        setTotalCarrinho(prev => prev + item.valor)
        setQtdItensCarrinho(prev => prev + 1)
        setItensCarrinho((prev) => {
            //ja existe no carrinho
            console.log(item)
            let index = prev.findIndex(x => x.id == item.id)
            if (index != -1) {
                prev[index].quantidade ? prev[index].quantidade += 1 : prev[index].quantidade = 1;
                return [...prev]
            }
            else {
                item.quantidade = 1;
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
            setTotalCarrinho(prev => prev + item.valor)
            setQtdItensCarrinho(prev => prev + 1)

            if (item.quantidade)
                setItensCarrinho(prev => {
                    prev[index].quantidade ? prev[index].quantidade += 1 : prev[index].quantidade = 1;
                    return [...prev]
                })

        }
    }

    function limparCarrinho() {
        setItensCarrinho([])
        setQtdItensCarrinho(0)
        setTotalCarrinho(0)
    }


    return <AppContext.Provider
        value={{
            setDadosUser,
            dadosUser,
            addItemCarrinho,
            addItemDiretoCarrinho,
            removeItemCarrinho,
            limparCarrinho,
            itensCarrinho,
            qtdItensCarrinho,
            totalCarrinho
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