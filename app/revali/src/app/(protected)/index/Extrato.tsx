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
import moment from 'moment'

export default function Extrato() {

  const { getExtrato } = useApiContext();
  const [extrato, setExtrato] = useState<ExtratoDto>()

  useFocusEffect(
    useCallback(() => {
      getExtrato()
        .then((result) => {
          setExtrato(result)
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
      data={moment(item.data).format('DD/MM/yyyy')}
      icone={item.isEntrada ? 'add' : 'remove'}
      corIcone={item.isEntrada ? Colors.verdeEscuro : Colors.red}
      onPress={item.id != 1 ? () => router.navigate({ pathname: '/screens/VisualizarMovimentacao', params: { id: item.id } }) : undefined} />
  }

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: Colors.backgroundDefault }}>
      <Header pagina={Consts.EXTRATO} moedas={extrato ? extrato.saldo_atual : undefined} />
      {
        extrato ?
          <>
            <Filters onChangeText={(value: string) => console.log(value)} />
            <FlatList
              data={extrato.movimentacoes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => renderItem(item)}
            />
            <InfoBar info={`Saldo: ${extrato.saldo_atual} moedas`} color={Colors.verdeClaro} />
          </> : <ActivityIndicator size={40} color={Colors.verdeEscuro} />
      }
    </SafeAreaView>
  )
}