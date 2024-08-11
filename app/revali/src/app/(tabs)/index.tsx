import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import HeaderHome from '@/src/components/HeaderHome'

export default function Home() {
  return (
    <SafeAreaView>
      <HeaderHome nomeUsuario='Antonieta Morais' moedasUsuario={5000}/>
    </SafeAreaView>
  )
}