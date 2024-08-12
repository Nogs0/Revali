import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { Consts } from '@/src/shared/Consts'
import InfoBarButton from '@/src/components/InfoBarButton'
import Filters from '@/src/components/Filters'
import { Colors } from '@/constants/Colors'
import CardMercado from '@/src/components/CardMercado'
import { useAppContext } from '@/src/contexts/appContext'

export default function Mercado(props: any) {
  const { addItemCarrinho, qtdItensCarrinho } = useAppContext();

  const DATA = [
    {
      id: 1,
      imagem: require('../../../assets/images/favicon.png'),
      nome: 'Enxada para horta',
      marca: 'VONDER',
      fornecedor: 'AgroPuc',
      valor: 1500
    },
    {
      id: 2,
      imagem: require('../../../assets/images/favicon.png'),
      nome: 'Enxada para horta',
      marca: 'VONDER',
      fornecedor: 'AgroPuc',
      valor: 1500
    },
    {
      id: 3,
      imagem: require('../../../assets/images/favicon.png'),
      nome: 'Enxada para horta',
      marca: 'VONDER',
      fornecedor: 'AgroPuc',
      valor: 1500
    },
    {
      id: 4,
      imagem: require('../../../assets/images/favicon.png'),
      nome: 'Enxada para horta',
      marca: 'VONDER',
      fornecedor: 'AgroPuc',
      valor: 1500
    },
    {
      id: 5,
      imagem: require('../../../assets/images/favicon.png'),
      nome: 'Enxada para horta',
      marca: 'VONDER',
      fornecedor: 'AgroPuc',
      valor: 1500
    },
    {
      id: 6,
      imagem: require('../../../assets/images/favicon.png'),
      nome: 'Enxada para horta',
      marca: 'VONDER',
      fornecedor: 'AgroPuc',
      valor: 1500
    }
  ]

  function renderItem(item: any) {
    return <CardMercado nome={item.nome}
      imagem={item.imagem}
      marca={item.marca}
      fornecedor={item.fornecedor}
      valor={item.valor}
      onPress={() => console.log(1)}
      onPressButton={() => addItemCarrinho(item)} />
  }

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <Header pagina={Consts.MERCADO} moedas={5000} />
      <Filters
        onChangeText={(value: string) => console.log(value)}
        buttons={[
          { text: 'Menor preço', onPress: () => console.log(0) },
          { text: 'Maior preço', onPress: () => console.log(1) },
          { text: 'Mais vendido', onPress: () => console.log(2) }]} />
      <FlatList
        style={{ marginTop: 10, marginBottom: qtdItensCarrinho > 0 ? '20%' : '0%' }}
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
      { qtdItensCarrinho > 0 ?
          <InfoBarButton
            info={`Carrinho com: ${qtdItensCarrinho} itens`}
            color={Colors.lime300}
            destino={{ pathname: '/screens/Carrinho' }} />
          : <></>}
    </SafeAreaView>
  )
}