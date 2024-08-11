import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { Consts } from '@/src/shared/Consts'

export default function Extrato() {
  return (
    <SafeAreaView>
        <Header pagina={Consts.EXTRATO}/>
    </SafeAreaView>
  )
}