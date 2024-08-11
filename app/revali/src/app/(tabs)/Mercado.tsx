import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { Consts } from '@/src/shared/Consts'

export default function Mercado() {
  return (
    <SafeAreaView>
        <Header pagina={Consts.MERCADO}/>
    </SafeAreaView>
  )
}