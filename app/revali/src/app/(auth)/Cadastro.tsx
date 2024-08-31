import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import Icon from '@expo/vector-icons/Ionicons'
import { useAuthContext } from '@/src/contexts/authContext'
import { showMessage } from 'react-native-flash-message'
import { regexCNPJ, regexCPF, regexDocumento, regexEMAIL } from '@/src/shared/Helpers'
import { Link, router } from 'expo-router'

export default function Cadastro() {

  const { cadastrar } = useAuthContext();

  const [name, setName] = useState<string>('')
  const [documento, setDocumento] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password_confirmation, setPassword_confirmation] = useState<string>('')
  const [hidePassword, setHidePassword] = useState<boolean>(true)
  const [hidePassword2, setHidePassword2] = useState<boolean>(true)
  const [sucesso, setSucesso] = useState<boolean>(false)

  function isValid(): boolean {
    return password.length >= 8 && password == password_confirmation &&
      regexEMAIL.test(email.trim().toLowerCase()) &&
      regexDocumento.test(documento)
  }

  function handleCadastrar() {
    if (isValid()) {
      cadastrar({
        name,
        email,
        password,
        password_confirmation,
        cpf: regexCPF.test(documento) ? documento : undefined,
        cnpj: regexCNPJ.test(documento) ? documento : undefined
      })
        .then(() => {
          setSucesso(true)
        })
        .catch((e) => {
          showMessage({
            message: 'Dados inválidos!',
            type: 'danger'
          })
        })
    } else {
      showMessage({
        message: 'Dados inválidos!',
        type: 'danger'
      })
    }
  }

  return (
    <SafeAreaView style={{
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.backgroundDefault
    }}>
      <View style={{ height: '30%', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Image style={{ height: 120, width: 300 }} source={require('@/assets/images/logo-horizontal-verde-amarelo.png')} />
        <Image style={{ height: 80, width: 160 }} source={require('@/assets/images/selo-proex-40anos-1cor.png')} />
      </View>

      <View style={{
        backgroundColor: Colors.verdeEscuro,
        height: '70%',
        paddingHorizontal: '5%',
        paddingTop: 30,
        width: '100%',
        borderTopRightRadius: 30
      }}>
        {
          !sucesso ?
            <>
              <TextInput
                placeholder='Nome'
                style={{
                  backgroundColor: Colors.backgroundDefault,
                  height: 40,
                  marginHorizontal: 20,
                  marginVertical: 10,
                  borderRadius: 15,
                  padding: 10,
                  fontFamily: 'Raleway', fontSize: 20
                }}
                onChangeText={setName}
                value={name}
              ></TextInput>
              <View style={{
                marginHorizontal: 20,
                marginVertical: 10,
              }}>
                <TextInput
                  placeholder='Documento (CPF/CNPJ)'
                  style={{
                    backgroundColor: Colors.backgroundDefault,
                    height: 40,
                    borderRadius: 15,
                    padding: 10,
                    fontFamily: 'Raleway', fontSize: 20
                  }}
                  onChangeText={setDocumento}
                  value={documento}
                ></TextInput>
                {documento.length > 0 && !regexDocumento.test(documento) ?
                  <Text style={{ color: Colors.amarelo, fontFamily: 'Raleway', fontSize: 20, marginLeft: '2%' }}>Informe um documento válido...</Text> : <></>}
              </View>
              <View style={{
                marginHorizontal: 20,
                marginVertical: 10,
              }}>
                <TextInput
                  placeholder='Email'
                  style={{
                    backgroundColor: Colors.backgroundDefault,
                    height: 40,
                    borderRadius: 15,
                    padding: 10,
                    fontFamily: 'Raleway', fontSize: 20
                  }}
                  keyboardType='email-address'
                  onChangeText={setEmail}
                  value={email}
                ></TextInput>
                {email.length > 0 && !regexEMAIL.test(email) ?
                  <Text style={{ color: Colors.amarelo, fontFamily: 'Raleway', fontSize: 20, marginLeft: '2%' }}>Informe um email válido...</Text> : <></>}
              </View>
              <View style={{
                marginHorizontal: 20,
                marginVertical: 10,
              }}>
                <View style={{
                  backgroundColor: Colors.backgroundDefault,
                  height: 40,
                  borderRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <TextInput
                    placeholder='Senha'
                    style={{
                      flex: 1,
                      padding: 10,
                      fontFamily: 'Raleway', fontSize: 20
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
                  height: 40,
                  borderRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <TextInput
                    placeholder='Confirme a senha'
                    style={{
                      flex: 1,
                      padding: 10,
                      fontFamily: 'Raleway', fontSize: 20
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
              <View style={{ justifyContent: 'flex-end', height: '40%' }}>
                <TouchableOpacity style={{
                  marginTop: '5%',
                  backgroundColor: Colors.amarelo,
                  borderRadius: 15,
                  marginHorizontal: '20%',
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center'
                }} onPress={() => handleCadastrar()}>
                  <Text style={{ fontFamily: 'Renovate', color: Colors.verdeEscuro, fontSize: 26 }}>CADASTRAR</Text>
                </TouchableOpacity>
              </View>
            </>
            :
            <View style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                width: '70%',
                textAlign: 'justify',
                color: Colors.backgroundDefault,
                marginVertical: '5%',
                fontFamily: 'Raleway',
                fontSize: 20
              }}>Seu cadastro foi realizado com sucesso, você será encaminhado para a tela de login! Basta utilizar o email e a senha que você cadastrou nesta etapa!</Text>
              <Link href={'/(auth)/'} asChild>
                <TouchableOpacity style={{
                  backgroundColor: Colors.amarelo,
                  borderRadius: 15,
                  marginHorizontal: '30%',
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30%'
                }}>
                  <Text style={{
                    textAlign: 'center',
                    color: Colors.verdeEscuro,
                    marginVertical: '5%',
                    fontFamily: 'Renovate',
                  }}>Ok!</Text>
                </TouchableOpacity>
              </Link>
              <Text style={{
                width: '70%',
                textAlign: 'center',
                color: Colors.backgroundDefault,
                marginVertical: '5%',
                fontFamily: 'Raleway',
                fontSize: 20
              }}>Obrigado por estar nessa conosco!</Text>
            </View>
        }
      </View>
    </SafeAreaView>
  )
}