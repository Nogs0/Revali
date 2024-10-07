import { Colors } from '@/constants/Colors';
import { useAuthContext } from '@/src/contexts/authContext';
import Icon from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export default function Login() {

  const { login, loading } = useAuthContext();
  const [cpf, setCpf] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  function handleLogin() {
    login(cpf, password)
      .then((r) => {})
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
        loading ?
          <ActivityIndicator size={40} color={Colors.verdeEscuro} /> :
          <>
            <KeyboardAvoidingView style={{ width: '100%' }} contentContainerStyle={{ height: '70%' }} behavior='height'>
              <View style={{ height: '30%', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 180, width: 180 }} source={require('@/assets/images/logo-verde-amarelo.png')} />
              </View>
              <ScrollView style={{
                backgroundColor: Colors.verdeEscuro,
                paddingHorizontal: '5%',
                paddingTop: 30,
                borderTopRightRadius: 30,
                height: '70%'
              }} contentContainerStyle={{ height: '100%' }}>
                <Text style={{
                  fontFamily: 'Raleway',
                  fontSize: 32,
                  color: Colors.backgroundDefault,
                  textAlign: 'center',
                  marginBottom: '5%'
                }}>Olá, agricultor!</Text>
                <TextInput
                  placeholder='CPF'
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
                  onChangeText={setCpf}
                  value={cpf}
                ></TextInput>
                <View style={{
                  backgroundColor: Colors.backgroundDefault,
                  height: 45,
                  marginHorizontal: 20,
                  marginVertical: 10,
                  borderRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                }}>
                  <TextInput
                    placeholder='Senha'
                    style={{
                      flex: 1,
                      fontFamily: 'Raleway',
                      fontSize: 20
                    }}
                    onChangeText={setPassword}
                    passwordRules={'minlength:11'}
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
                  <Text style={{ fontFamily: 'Renovate', color: Colors.verdeEscuro, fontSize: 22 }}>ENTRAR</Text>
                </TouchableOpacity>
                <KeyboardAvoidingView style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '50%'
                }}>
                  <Text style={{
                    fontFamily: 'Raleway',
                    fontSize: 22,
                    color: Colors.backgroundDefault,
                    textAlign: 'center',
                  }}>Ainda não possui cadastro?</Text>
                  <Link href={'/(auth)/Cadastro'} asChild>
                    <TouchableOpacity>
                      <Text style={{ fontFamily: 'Renovate', color: Colors.amarelo, fontSize: 24 }}>CADASTRAR</Text>
                    </TouchableOpacity>
                  </Link>
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
                </KeyboardAvoidingView>
              </ScrollView>
            </KeyboardAvoidingView>
          </>
      }
    </SafeAreaView>
  )
}