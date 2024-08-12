import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { Consts } from '@/src/shared/Consts'
import Card from '@/src/components/Card'
import { Colors } from '@/constants/Colors'
import InfoBar from '@/src/components/InfoBar'
import Filters from '@/src/components/Filters'

export default function Extrato() {

  const DATA = [
    {
      pontos: 3200,
      descricao: 'Doação 2024/02',
      data: '08/08/2024',
      informacaoAdicional: 'Banco de alimentos de Poços de Caldas',
      entrada: true
    },
    {
      pontos: 3200,
      descricao: 'Doação 2024/02',
      data: '08/08/2024',
      informacaoAdicional: 'Banco de alimentos de Poços de Caldas',
      entrada: true
    },
    {
      pontos: 1200,
      descricao: 'Compra',
      data: '08/08/2024',
      informacaoAdicional: 'Troca de pontos - 3 itens adquiridos',
      entrada: false
    }
  ]

  function renderItem(item: any) {
    return <Card titulo={`${item.pontos} - ${item.descricao}`}
      conteudo={item.informacaoAdicional}
      data={item.data}
      icone={item.entrada ? 'add' : 'remove'}
      corIcone={item.entrada ? Colors.lime900 : Colors.red}
      onPress={() => console.log('a')} />
  }

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Header pagina={Consts.EXTRATO} moedas={5000}/>
      <Filters onChangeText={(value: string) => console.log(value)}/>
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
      <InfoBar info={`Saldo: 5000 moedas`} color={Colors.lime300}/>
    </SafeAreaView>
  )
}