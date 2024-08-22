import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderHome from '@/src/components/HeaderHome'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'

export default function Home() {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <HeaderHome nomeUsuario='Antonieta Morais' moedasUsuario={5000}/>
      <View style={{height: '80%', alignItems: 'center'}}>
        <TouchableOpacity style={{borderRadius: 20, backgroundColor: Colors.lime300, alignItems: 'center', justifyContent: 'center', width: '70%', height: '8%', marginTop: 20}} onPress={() => router.navigate({pathname: '/screens/Doacoes'})}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Doações em andamento</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}