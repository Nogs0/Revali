import { createContext, useContext, useState } from "react";

export type buttonType = {
    text: string,
    onPress: () => any
}
interface AppContextData {
    addItemCarrinho: (item: any) => any,
    removeItemCarrinho: (id: number) => any,
    itensCarrinho: any[],
    qtdItensCarrinho: number,
    totalCarrinho: number
}

const AppContext = createContext<AppContextData>({} as AppContextData);

function AppProvider({ children }: any) {

    const [itensCarrinho, setItensCarrinho] = useState<any[]>([]);
    const [qtdItensCarrinho, setQtdItensCarrinho] = useState<number>(0);
    const [totalCarrinho, setTotalCarrinho] = useState<number>(0);

    function addItemCarrinho(item: any) {
        setTotalCarrinho(prev => prev + item.valor)
        setQtdItensCarrinho(prev => prev + 1)
        setItensCarrinho((prev) => [...prev, item])
    }

    function removeItemCarrinho(id: number) {
        let index = itensCarrinho.findIndex(x => x.id == id)
        if (index != -1) {
            let item = itensCarrinho[index].clone()
            setTotalCarrinho(prev => prev - item.valor)
            setQtdItensCarrinho(prev => prev - 1)
            setItensCarrinho((prev) => {
                prev.splice(index, 1);
                return [...prev];
            })
        }
    }

    return <AppContext.Provider
        value={{
            addItemCarrinho,
            removeItemCarrinho,
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