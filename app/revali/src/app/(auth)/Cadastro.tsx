import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import Icon from '@expo/vector-icons/Ionicons'
import { useAuthContext } from '@/src/contexts/authContext'
import { showMessage } from 'react-native-flash-message'
import { regexCNPJ, regexCPF, regexDocumento, regexEMAIL } from '@/src/shared/Helpers'
import { Link, router } from 'expo-router'
import ImagensLogoProex from '@/src/components/ImagensLogoProex'

export default function Cadastro() {

  const { cadastrar } = useAuthContext();

  const [name, setName] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [sucesso, setSucesso] = useState<boolean>(false)

  function isValid(): boolean {
    return regexDocumento.test(cpf)
  }

  function handleCadastrar() {
    if (isValid()) {
      cadastrar({
        name,
        cpf
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
      {/* <ImagensLogoProex height={'30%'}/> */}
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
                  placeholder='CPF'
                  style={{
                    backgroundColor: Colors.backgroundDefault,
                    height: 40,
                    borderRadius: 15,
                    padding: 10,
                    fontFamily: 'Raleway', fontSize: 20
                  }}
                  onChangeText={setCpf}
                  value={cpf}
                ></TextInput>
                {cpf.length > 0 && !regexDocumento.test(cpf) ?
                  <Text style={{ color: Colors.amarelo, fontFamily: 'Raleway', fontSize: 20, marginLeft: '2%' }}>Informe um documento válido...</Text> : <></>}
              </View>
              <View style={{ justifyContent: 'flex-end', height: '45%' }}>
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
                <View style={{
                  marginTop: '5%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image style={{
                    height: 60,
                    width: 100
                  }} source={require('@/assets/images/selo-proex-40anos-1cor.png')} />
                </View>
              </View>
            </>
            :
            <View style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '80%'
            }}>
              <Text style={{
                width: '70%',
                textAlign: 'justify',
                color: Colors.backgroundDefault,
                marginVertical: '5%',
                fontFamily: 'Raleway',
                fontSize: 24
              }}>Seu cadastro foi realizado com sucesso, você será encaminhado para a tela de login! Basta utilizar o cpf como usuário e senha!</Text>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
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
            </View>
        }
      </View>
    </SafeAreaView>
  )
}