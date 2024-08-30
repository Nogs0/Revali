import { View, Image, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useAuthContext } from '@/src/contexts/authContext'
import Icon from '@expo/vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';
import { Link } from 'expo-router';

export default function Login() {

  const { login, loading } = useAuthContext();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  function handleLogin() {
    login(email, password)
      .then((r) => console.log('logado'))
      .catch((e) => {
        showMessage({
          message: 'Credenciais inválidas!',
          type: 'danger'
        })
      })
  }

  return (
    <SafeAreaView style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.backgroundDefault, }}>
      {
        !loading ?
          <>
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
              <Text style={{
                fontFamily: 'Raleway',
                fontSize: 30,
                color: Colors.backgroundDefault,
                textAlign: 'center',
                marginBottom: '5%'
              }}>Olá, agricultor!</Text>
              <TextInput
                placeholder='Email'
                style={{
                  backgroundColor: Colors.backgroundDefault,
                  height: 40,
                  marginHorizontal: 20,
                  marginVertical: 10,
                  borderRadius: 15,
                  padding: 10,
                  fontFamily: 'Raleway'
                }}
                keyboardType='email-address'
                onChangeText={setEmail}
                value={email}
              ></TextInput>
              <View style={{
                backgroundColor: Colors.backgroundDefault,
                height: 40,
                marginHorizontal: 20,
                marginVertical: 10,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <TextInput
                  placeholder='Senha'
                  style={{
                    flex: 1,
                    padding: 10,
                    fontFamily: 'Raleway'
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
              <TouchableOpacity style={{
                marginTop: '5%',
                backgroundColor: Colors.amarelo,
                borderRadius: 15,
                marginHorizontal: '30%',
                height: 30,
                alignItems: 'center',
                justifyContent: 'center'
              }} onPress={() => handleLogin()}>
                <Text style={{ fontFamily: 'Renovate', color: Colors.verdeEscuro, fontSize: 20 }}>ENTRAR</Text>
              </TouchableOpacity>
              <View style={{
                height: '50%',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontFamily: 'Raleway',
                  fontSize: 20,
                  color: Colors.backgroundDefault,
                  textAlign: 'center',
                  marginBottom: '5%'
                }}>Ainda não possui cadastro?</Text>
                <Link href={'/(auth)/Cadastro'} asChild>
                  <TouchableOpacity>
                    <Text style={{ fontFamily: 'Renovate', color: Colors.amarelo, fontSize: 20 }}>CADASTRAR</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </>
          : <ActivityIndicator size={40} color={Colors.verdeEscuro} />
      }
    </SafeAreaView>
  )
}