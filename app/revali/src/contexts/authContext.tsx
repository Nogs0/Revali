import { createContext, useContext, useState } from "react";

interface AuthContextData {
    signed: boolean,
    userId: number | undefined,
    login(email: string | undefined, password: string | undefined): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: any) {
    const [userId, setUserId] = useState<number>();

    function login(email: string | undefined, password: string | undefined) {
        setUserId(1)
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                userId,
                signed: userId != null
            }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuthContext() {
    let context = useContext(AuthContext);
    if (!context)
        console.error(new Error('useAuthContext must be used with AuthProvider'))

    return context;
}

export { AuthProvider, useAuthContext }