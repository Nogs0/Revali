import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import Icon from '@expo/vector-icons/Ionicons'
import ModalConfirmacao from '@/src/components/ModalConfirmacao'
import { useAuthContext } from '@/src/contexts/authContext'
import { showMessage } from 'react-native-flash-message'
import { router } from 'expo-router'
import { regexEMAIL } from '@/src/shared/Helpers'

export default function RedefinirSenha() {

    const { redefinirSenha } = useAuthContext();

    const [email, setEmail] = useState<string>('');
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [hideCurrentPassword, setHideCurrentPassword] = useState<boolean>(true)
    const [password, setPassword] = useState<string>('')
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [password_confirmation, setPassword_confirmation] = useState<string>('')
    const [hidePassword2, setHidePassword2] = useState<boolean>(true)
    const [modalConfirmarMudanca, setModalConfirmarMudanca] = useState<boolean>(false);

    function handleRedefinirSenha() {
        if (isValid())
            setModalConfirmarMudanca(true);
        else {
            showMessage({
                message: 'Por favor, informe dados válidos!',
                type: 'warning'
            })
        }
    }

    function isValid(): boolean {
        return password.length >= 8 && password == password_confirmation &&
            regexEMAIL.test(email.trim().toLowerCase());
    }

    useEffect(() => {
        const backAction = () => {
            // Retorne true para desabilitar o botão de voltar
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        // Limpe o listener ao desmontar o componente
        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.backgroundDefault
        }}>
            <ModalConfirmacao
                visible={modalConfirmarMudanca}
                titulo='Atenção!'
                mensagem='Deseja realmente alterar sua senha?'
                onOk={() => {
                    redefinirSenha(email, currentPassword, password, password_confirmation)
                        .then(() => {
                            router.dismissAll();
                        })
                        .catch(() => {
                            showMessage({
                                message: 'Erro ao redefinir senha!',
                                type: 'danger'
                            })
                        });
                }}
                onCancel={() => setModalConfirmarMudanca(false)} />

            <View style={{ height: '30%', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 180, width: 180 }} source={require('@/assets/images/logo-verde-amarelo.png')} />
            </View>
            <View style={{
                backgroundColor: Colors.verdeEscuro,
                height: '70%',
                paddingHorizontal: '5%',
                paddingTop: 30,
                width: '100%',
                borderTopRightRadius: 30
            }}>
                <TextInput
                    placeholder='Email'
                    style={{
                        backgroundColor: Colors.backgroundDefault,
                        height: 45,
                        marginHorizontal: 20,
                        marginVertical: 10,
                        borderRadius: 15,
                        padding: 10,
                        fontFamily: 'Raleway',
                        fontSize: 20
                    }}
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    value={email}
                ></TextInput>
                <View style={{
                    marginHorizontal: 20,
                    marginVertical: 10,
                }}>
                    <View style={{
                        backgroundColor: Colors.backgroundDefault,
                        height: 45,
                        borderRadius: 15,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <TextInput
                            placeholder='Senha'
                            style={{
                                flex: 1,
                                padding: 10,
                                fontFamily: 'Raleway',
                                fontSize: 20
                            }}
                            onChangeText={setCurrentPassword}
                            passwordRules={'minlength:8'}
                            secureTextEntry={hideCurrentPassword}
                            value={currentPassword}
                        />
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                flex: 0.2,
                                marginRight: 10
                            }}
                            onPress={() => setHideCurrentPassword(!hideCurrentPassword)}>
                            <Icon name={hideCurrentPassword ? 'eye' : 'eye-off'} size={20} color={Colors.verdeEscuro}></Icon>
                        </TouchableOpacity>
                    </View>
                    {password.length > 0 && password.length < 8 ?
                        <Text style={{ color: Colors.amarelo, fontFamily: 'Raleway', fontSize: 20, marginLeft: '2%' }}>A senha deve possuir no mínimo 8 digitos...</Text> : <></>}
                </View>
                <View style={{
                    marginHorizontal: 20,
                    marginVertical: 10,
                }}>
                    <View style={{
                        backgroundColor: Colors.backgroundDefault,
                        height: 45,
                        borderRadius: 15,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <TextInput
                            placeholder='Senha'
                            style={{
                                flex: 1,
                                padding: 10,
                                fontFamily: 'Raleway',
                                fontSize: 20
                            }}
                            onChangeText={setPassword}
                            passwordRules={'minlength:8'}
                            secureTextEntry={hidePassword}
                            value={password}
                        />
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                flex: 0.2,
                                marginRight: 10
                            }}
                            onPress={() => setHidePassword(!hidePassword)}>
                            <Icon name={hidePassword ? 'eye' : 'eye-off'} size={20} color={Colors.verdeEscuro}></Icon>
                        </TouchableOpacity>
                    </View>
                    {password.length > 0 && password.length < 8 ?
                        <Text style={{ color: Colors.amarelo, fontFamily: 'Raleway', fontSize: 20, marginLeft: '2%' }}>A senha deve possuir no mínimo 8 digitos...</Text> : <></>}
                </View>
                <View style={{
                    marginHorizontal: 20,
                    marginVertical: 10,
                }}>
                    <View style={{
                        backgroundColor: Colors.backgroundDefault,
                        height: 45,
                        borderRadius: 15,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <TextInput
                            placeholder='Confirme a senha'
                            style={{
                                flex: 1,
                                padding: 10,
                                fontFamily: 'Raleway',
                                fontSize: 20
                            }}
                            onChangeText={setPassword_confirmation}
                            passwordRules={'minlength:8'}
                            secureTextEntry={hidePassword2}
                            value={password_confirmation}
                        />
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                flex: 0.2,
                                marginRight: 10
                            }}
                            onPress={() => setHidePassword2(!hidePassword2)}>
                            <Icon name={hidePassword2 ? 'eye' : 'eye-off'} size={20} color={Colors.verdeEscuro}></Icon>
                        </TouchableOpacity>
                    </View>
                    {password.length > 0 && password != password_confirmation ?
                        <Text style={{ color: Colors.amarelo, fontFamily: 'Raleway', fontSize: 20, marginLeft: '2%' }}>As senhas devem ser iguais...</Text> : <></>}
                </View>
                <View>
                    <TouchableOpacity style={{
                        marginTop: '5%',
                        backgroundColor: Colors.amarelo,
                        borderRadius: 15,
                        marginHorizontal: '20%',
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onPress={() => handleRedefinirSenha()}>
                        <Text style={{ fontFamily: 'Renovate', color: Colors.verdeEscuro, fontSize: 26 }}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}