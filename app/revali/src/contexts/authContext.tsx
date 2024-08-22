import { createContext, useContext, useState } from "react";

interface AuthContextData {
    signed: boolean,
    userId: number
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: any) {
    const [userId, setUserId] = useState<number>(1);

    return (
        <AuthContext.Provider
            value={{
                userId,
                signed: false
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