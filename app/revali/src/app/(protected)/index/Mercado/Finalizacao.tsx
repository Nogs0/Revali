import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { router } from 'expo-router'
import style from './styles/styleFinalizacao'
import CardFinalizacao from '@/src/components/CardFinalizacao'
import { useAppContext } from '@/src/contexts/appContext'
import { useApiContext } from '@/src/contexts/apiContext'
import moment from 'moment'
import { Colors } from '@/constants/Colors'
import { ProdutosCompra } from '@/src/shared/Types'
import { showMessage } from 'react-native-flash-message'
import ImagensLogoProex from '@/src/components/ImagensLogoProex'

export default function Finalizacao() {

  const { itensCarrinho, qtdItensCarrinho, totalCarrinho, dadosUser } = useAppContext();
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


    if (dadosUser) {
      if (dadosUser.saldo < totalCarrinho) {
        showMessage({
          message: 'Você não possui saldo suficiente para realizar esta compra!',
          type: 'warning',
          duration: 3000
        })
      }
      else {
        confirmarCompra({
          data: moment().format('YYYY-MM-DD'),
          doador_id: dadosUser.doador_id,
          itens: itensCarrinho as ProdutosCompra[]
        })
          .then((result) => {
            router.navigate('/Mercado/InfoResgateDeProdutos')
          })
          .catch((e) => {
            console.error(e)
            showMessage({
              message: 'Falha ao adquirir itens!',
              type: 'danger'
            })
          });
      }
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Header pagina='FINALIZAÇÃO' back={router.back} moedas={dadosUser.saldo}/>
      <View style={{ height: '90%' }}>
        <Text style={{ fontSize: 30, fontFamily: 'Renovate', textAlign: 'center', marginTop: '3%' }} >{qtdItensCarrinho} item(s) - {totalCarrinho} pontos</Text>
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
            <Text style={{ fontSize: 26, fontFamily: 'Renovate', color: Colors.backgroundDefault }}>Confirmar compra</Text>
          </TouchableOpacity>
          <Image style={{ height: 120, width: 300 }} source={require('@/assets/images/logo-horizontal-verde-amarelo.png')} />
        </View>
      </View>
    </SafeAreaView>
  )
}