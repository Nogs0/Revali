import { createContext, useContext, useState } from "react";

interface AppContextData {
    tabSelected: number,
    setTabSelected: any
}

const AppContext = createContext<AppContextData>({} as AppContextData);

function AppProvider({ children }: any) {
    const [tabSelected, setTabSelected] = useState<number>(0);

    return <AppContext.Provider
        value={{ tabSelected, setTabSelected }}>
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