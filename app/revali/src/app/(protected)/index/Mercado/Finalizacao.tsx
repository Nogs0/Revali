import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
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

  const { itensCarrinho, qtdItensCarrinho, totalCarrinho, dadosUser, setDadosUser } = useAppContext();
  const { confirmarCompra, getDadosUsuarioLogado } = useApiContext();

  const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true)
        confirmarCompra({
          data: moment().format('YYYY-MM-DD'),
          doador_id: dadosUser.doador_id,
          itens: itensCarrinho as ProdutosCompra[]
        })
          .then((result) => {
            router.navigate('/Mercado/InfoResgateDeProdutos');
            getDadosUsuarioLogado()
              .then((dados) => {
                setDadosUser(dados);
              })
              .catch((e) => {
                console.error(e)
                showMessage({
                  message: 'Falha ao recuperar informações do usuário!',
                  type: 'danger'
                })
              });
          })
          .catch((e) => {
            console.error(e)
            showMessage({
              message: 'Falha ao adquirir itens!',
              type: 'danger'
            })
          }).finally(() => setLoading(false));
      }
    }
  }

  return (
    <SafeAreaView style={style.container}>
      {loading ?
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={Colors.verdeEscuro} size={70} />
        </View>
        : <>
          <Header pagina='FINALIZAÇÃO' back={router.back} moedas={dadosUser.saldo} />
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
        </>}
    </SafeAreaView>
  )
}