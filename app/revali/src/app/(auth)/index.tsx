import { View, Image, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useAuthContext } from '@/src/contexts/authContext'

export default function Login() {

  const { login } = useAuthContext();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View style={{ height: '30%', alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('@/assets/images/logo-banco.png')} />
      </View>
      <View style={{ backgroundColor: Colors.lime900, height: '70%', paddingHorizontal: '5%', paddingTop: 30 }}>
        <TextInput
          placeholder='Email'
          style={{ backgroundColor: 'white', height: 40, marginHorizontal: 20, marginVertical: 10, borderRadius: 15 }}
          onChangeText={setEmail}
          value={email}
        ></TextInput>
        <TextInput
          placeholder='Senha'
          style={{ backgroundColor: 'white', height: 40, marginHorizontal: 20, marginVertical: 10, borderRadius: 15 }}
          onChangeText={setPassword}
          value={password}
          ></TextInput>
        <TouchableOpacity style={{ marginTop: 50, backgroundColor: Colors.lime500, borderRadius: 15, marginHorizontal: 50, height: 30, alignItems: 'center', justifyContent: 'center' }} onPress={() => login(email, password)}>
          <Text>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}