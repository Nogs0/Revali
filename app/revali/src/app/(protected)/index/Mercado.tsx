import { Colors } from '@/constants/Colors'
import CardMercado from '@/src/components/CardMercado'
import Filters from '@/src/components/Filters'
import Header from '@/src/components/Header'
import InfoBarButton from '@/src/components/InfoBarButton'
import { useApiContext } from '@/src/contexts/apiContext'
import { useAppContext } from '@/src/contexts/appContext'
import { Consts } from '@/src/shared/Consts'
import { ProdutosResgate } from '@/src/shared/Types'
import { useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import { showMessage } from 'react-native-flash-message'

export default function Mercado() {

  const { addItemCarrinho, qtdItensCarrinho, dadosUser } = useAppContext();
  const { getProdutosParaCompra } = useApiContext();
  const [itens, setItens] = useState<ProdutosResgate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        .finally(() => setLoading(false))
    }, [])
  )

  function renderItem(item: ProdutosResgate) {
    return <CardMercado nome={item.nome}
      imagem={item.pastaDeFotos}
      marca={item.marca}
      fornecedor={item.fornecedor}
      valor={item.valor}
      id={item.id}
      onPressButton={() => addItemCarrinho({
        fornecedor: item.fornecedor,
        imagem: item.pastaDeFotos,
        id: item.id,
        valor: item.valor,
        nome: item.nome,
        marca: item.marca
      })} />
  }

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: Colors.backgroundDefault }}>
      <Header pagina={Consts.MERCADO} moedas={dadosUser.saldo} />
      <Filters
        onChangeText={(value: string) => console.log(value)}
        buttons={[
          { text: 'Menor preço', onPress: () => console.log(0) },
          { text: 'Maior preço', onPress: () => console.log(1) },
          { text: 'Mais vendido', onPress: () => console.log(2) }]} />
      {
        loading ? <ActivityIndicator size={40} color={Colors.verdeEscuro}/>
        :
        <FlatList
          style={{ marginTop: 10, marginBottom: qtdItensCarrinho > 0 ? '20%' : '0%' }}
          data={itens}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderItem(item)}
        />
      }
      {qtdItensCarrinho > 0 ?
        <InfoBarButton
          info={`Carrinho com: ${qtdItensCarrinho} itens`}
          color={Colors.verdeClaro}
          destino={{ pathname: '/screens/Carrinho' }} />
        : <></>}
    </SafeAreaView>
  )
}