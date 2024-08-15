import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { router } from 'expo-router'
import style from './style'

export default function Doacoes() {
  return (
    <SafeAreaView style={style.container}>
      <Header pagina='DOAÇÕES' back={router.back} />
    </SafeAreaView>
  )
}