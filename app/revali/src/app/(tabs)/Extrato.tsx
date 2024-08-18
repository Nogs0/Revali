import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { Consts } from '@/src/shared/Consts'
import Card from '@/src/components/Card'
import { Colors } from '@/constants/Colors'
import InfoBar from '@/src/components/InfoBar'
import Filters from '@/src/components/Filters'
import { router } from 'expo-router'

export default function Extrato() {

  const DATA = [
    {
      id: 1,
      pontos: 3200,
      descricao: 'Doação 2024/02',
      data: '08/08/2024',
      informacaoAdicional: 'Banco de alimentos de Poços de Caldas',
      entrada: true
    },
    {
      id: 2,
      pontos: 3200,
      descricao: 'Doação 2024/02',
      data: '08/08/2024',
      informacaoAdicional: 'Banco de alimentos de Poços de Caldas',
      entrada: true
    },
    {
      id: 3,
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
      onPress={() => router.navigate({pathname: '/screens/VisualizarDoacao', params: {id: item.id}})} />
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