import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '@/src/components/Header'
import { Consts } from '@/src/shared/Consts'
import Card from '@/src/components/Card'
import { Colors } from '@/constants/Colors'
import InfoBar from '@/src/components/InfoBar'
import Filters from '@/src/components/Filters'
import { router, useFocusEffect } from 'expo-router'
import { useApiContext } from '@/src/contexts/apiContext'
import { ExtratoDto, Movimentacoes } from '@/src/shared/Types'
import { showMessage } from 'react-native-flash-message'

export default function Extrato() {

  const { getExtrato } = useApiContext();
  const [extrato, setExtrato] = useState<ExtratoDto>()

  useFocusEffect(
    useCallback(() => {
      getExtrato()
        .then((result) => {
          setExtrato(result)
          console.log(result.movimentacoes)
        })
        .catch((e) => {
          showMessage({
            message: 'Falha ao carregar movimentações',
            type: 'danger'
          }),
            console.error(e)
        })
    }, [])
  );

  function renderItem(item: Movimentacoes) {
    return <Card titulo={`${item.pontos} - ${item.isEntrada ? 'Doação' : 'Compra'}`}
      conteudo={item.origem}
      data={item.data.toString()}
      icone={item.isEntrada ? 'add' : 'remove'}
      corIcone={item.isEntrada ? Colors.lime900 : Colors.red}
      onPress={() => router.navigate({ pathname: '/screens/VisualizarMovimentacao', params: { id: item.id } })} />
  }

  return (
    <SafeAreaView style={{ height: '100%' }}>
      {
        extrato ?
          <>
            <Header pagina={Consts.EXTRATO} moedas={extrato.saldo_atual} />
            <Filters onChangeText={(value: string) => console.log(value)} />
            <FlatList
              data={extrato.movimentacoes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => renderItem(item)}
            />
            <InfoBar info={`Saldo: ${extrato.saldo_atual} moedas`} color={Colors.lime300} />
          </> : <ActivityIndicator size={40} color={Colors.lime900} />
      }
    </SafeAreaView>
  )
}