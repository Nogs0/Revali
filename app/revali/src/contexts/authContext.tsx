import { createContext, useContext, useEffect, useState } from "react";
import { api_url } from "../services/config-dev";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CadastroDto } from "../shared/Types";

interface AuthContextData {
    loading: boolean,
    signed: boolean,
    userId: number | undefined,
    token: string | undefined,
    login(email: string | undefined, password: string | undefined): Promise<string>,
    logout(): void,
    cadastrar(input: CadastroDto): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: any) {
    const [userId, setUserId] = useState<number | undefined>();
    const [token, setToken] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadStorageData()
            .then(() => {
            })
            .catch(() => {
                console.log('ERRO AUTH')
            })
    }, []);

    const loadStorageData = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            AsyncStorage.getItem('@RNAuth:email')
                .then((emailStorage) => {
                    if (emailStorage) {
                        AsyncStorage.getItem('@RNAuth:password')
                            .then((passwordStorage) => {
                                if (passwordStorage) {
                                    login(emailStorage, passwordStorage)
                                        .then((result) => {
                                            setLoading(false);
                                            setToken(result)
                                            resolve();
                                        })
                                        .catch((e) => {
                                            setLoading(false)
                                            setToken(undefined)
                                        })
                                }
                            })
                    }
                }).catch((e) => console.log(e))
                .finally(() => setLoading(false));
        })
    }

    function login(email: string, password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            fetch(`${api_url}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type for JSON
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                })
                .then((response) => response.json())
                .then((json) => {
                    if (json.message) {
                        reject();
                        return;
                    }
                    console.log(json.access_token)
                    setToken(json.access_token)
                    AsyncStorage.setItem('@RNAuth:email', email)
                        .then(() => {
                            AsyncStorage.setItem('@RNAuth:password', password)
                                .then(() => {
                                    resolve(json.access_token)
                                })
                        })
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    function cadastrar(input: CadastroDto): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fetch(`${api_url}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.message) {
                        reject();
                        return;
                    }

                    resolve();
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    async function logout() {
        await AsyncStorage.clear()
        setToken(undefined);
    }

    return (
        <AuthContext.Provider
            value={{
                cadastrar,
                token,
                loading,
                login,
                logout,
                userId,
                signed: token != null
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