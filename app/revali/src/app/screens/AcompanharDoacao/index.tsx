import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import style from './style'
import Header from '@/src/components/Header'

export default function AcompanharDoacao() {
  return (
    <SafeAreaView style={style.container}>
      <Header pagina='2024/002' back={router.back}/>
    </SafeAreaView>
  )
}