import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { router } from 'expo-router'
import style from './style'
import CardFinalizacao from '@/src/components/CardFinalizacao'
import { useAppContext } from '@/src/contexts/appContext'
import { useApiContext } from '@/src/contexts/apiContext'
import moment from 'moment'

export default function Finalizacao() {

  const { itensCarrinho, qtdItensCarrinho, totalCarrinho, userId } = useAppContext();
  const { confirmarCompra } = useApiContext();

  function renderItem(item: any) {
    return (
      <CardFinalizacao
        quantidade={item.quantidade}
        imagem={item.imagem}
      />
    )
  }

  function handleConfirmarCompra() {
    confirmarCompra({
      data: moment().format('YYYY-MM-DD'),
      doador_id: userId,
      itens: itensCarrinho
    })
    .then((result) => {
      router.navigate('/(protected)')
    })
    .catch((e) => {
      console.error(e)
    });
  }

  return (
    <SafeAreaView style={style.container}>
      <Header pagina='FINALIZAÇÃO' back={router.back} />
      <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }} >{qtdItensCarrinho} item(s) - {totalCarrinho} pontos</Text>
      <View style={style.contentContainer}>
        <View style={style.itensContainer}>
          <FlatList
            horizontal
            data={itensCarrinho}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
      </View>
      <View style={style.confirmContainer}>
        <TouchableOpacity style={style.confirmButton} onPress={() => handleConfirmarCompra()}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>Confirmar compra</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Image style={{ width: 200, height: 160 }} source={require('@/assets/images/logo-banco.png')} />
        </View>
      </View>
    </SafeAreaView>
  )
}