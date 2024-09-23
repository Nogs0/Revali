import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CadastroDto } from "../shared/Types";

const api_url = "https://revali.zapto.org/api";
interface AuthContextData {
    loading: boolean,
    signed: boolean,
    userId: number | undefined,
    token: string | undefined,
    login(email: string | undefined, password: string | undefined): Promise<void>,
    logout(): void,
    cadastrar(input: CadastroDto): Promise<void>,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: any) {
    const [userId, setUserId] = useState<number | undefined>();
    const [token, setToken] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [signed, setSigned] = useState<boolean>(false);

    useEffect(() => {
        loadStorageData()
            .then(() => {
            })
            .catch(() => {
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
                                            resolve();
                                        })
                                        .catch((e) => {
                                            setLoading(false)
                                            setToken(undefined)
                                        })
                                }
                            }).catch((e) => {
                                setLoading(false)
                                setToken(undefined)
                            })
                    } else setLoading(false)
                }).catch((e) => {
                    setLoading(false);
                    setToken(undefined);
                })
        })
    }

    function login(email: string, password: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
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
                .then((response) => {
                    return response.json()
                })
                .then((json) => {
                    if (json.message) {
                        reject();
                        return;
                    }

                    setToken(json.access_token);

                    AsyncStorage.setItem('@RNAuth:email', email)
                        .then(() => {
                            AsyncStorage.setItem('@RNAuth:password', password)
                                .then(() => {
                                    resolve()
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

    // function redefinirSenha(email: string, current_password: string, password: string, password_confirmation: string): Promise<void> {
    //     return new Promise<void>((resolve, reject) => {
    //         fetch(`${api_url}/reset-password-primeiro-acesso`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify({
    //                 email: email,
    //                 senha_atual: current_password,
    //                 senha_nova: password,
    //                 senha_nova_confirmation: password_confirmation
    //             })
    //         })
    //             .then((response) => response.json())
    //             .then((json) => {
    //                 if (json.message && json.message != 'Senha alterada com sucesso') {
    //                     reject();
    //                     return;
    //                 }

    //                 setDeveRedefinirSenha(false)
    //                 setToken(undefined)
    //                 resolve();
    //             })
    //             .catch((e) => {
    //                 reject(e)
    //             })
    //     })
    // }

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