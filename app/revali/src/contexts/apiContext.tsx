import { createContext, useContext } from "react";

interface ApiContextData {
    getItemParaCompra(id: number): Promise<any>
}

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

function ApiProvider({ children }: any) {

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

    return (
        <ApiContext.Provider
            value={{
                getItemParaCompra
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