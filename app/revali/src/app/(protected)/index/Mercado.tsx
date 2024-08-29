import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '@/src/components/Header'
import { Consts } from '@/src/shared/Consts'
import InfoBarButton from '@/src/components/InfoBarButton'
import Filters from '@/src/components/Filters'
import { Colors } from '@/constants/Colors'
import CardMercado from '@/src/components/CardMercado'
import { useAppContext } from '@/src/contexts/appContext'
import { useApiContext } from '@/src/contexts/apiContext'
import { ProdutosResgate } from '@/src/shared/Types'
import { showMessage } from 'react-native-flash-message'
import { useFocusEffect } from 'expo-router'

export default function Mercado() {

  const { addItemCarrinho, qtdItensCarrinho } = useAppContext();
  const { getProdutosParaCompra } = useApiContext();
  const [itens, setItens] = useState<ProdutosResgate[]>([]);

  useFocusEffect(
    useCallback(() => {
      getProdutosParaCompra()
      .then((result) => {
        setItens(result)
      })
      .catch((e) => {
        showMessage({
          message: 'Falha ao carregar produtos para resgate',
          type: 'danger'
        })
        console.error(e)
      })
    }, [])
  )

  function renderItem(item: ProdutosResgate) {
    return <CardMercado nome={item.nome}
      imagem={item.pastaDeFotos}
      marca={item.marca}
      fornecedor={item.fornecedor}
      valor={item.valor}
      id={item.id}
      onPressButton={() => addItemCarrinho(item)} />
  }

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: Colors.backgroundDefault }}>
      <Header pagina={Consts.MERCADO} moedas={5000} />
      <Filters
        onChangeText={(value: string) => console.log(value)}
        buttons={[
          { text: 'Menor preço', onPress: () => console.log(0) },
          { text: 'Maior preço', onPress: () => console.log(1) },
          { text: 'Mais vendido', onPress: () => console.log(2) }]} />
      <FlatList
        style={{ marginTop: 10, marginBottom: qtdItensCarrinho > 0 ? '20%' : '0%' }}
        data={itens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
      {qtdItensCarrinho > 0 ?
        <InfoBarButton
          info={`Carrinho com: ${qtdItensCarrinho} itens`}
          color={Colors.verdeClaro}
          destino={{ pathname: '/screens/Carrinho' }} />
        : <></>}
    </SafeAreaView>
  )
}