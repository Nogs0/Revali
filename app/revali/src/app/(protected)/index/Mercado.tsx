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
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import { showMessage } from 'react-native-flash-message'

export default function Mercado() {

  const { addItemCarrinho, qtdItensCarrinho, dadosUser } = useAppContext();
  const { getProdutosParaCompra } = useApiContext();
  const [itens, setItens] = useState<ProdutosResgate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string | undefined>();
  const [menorPreco, setMenorPreco] = useState<boolean>(false);
  const [maiorPreco, setMaiorPreco] = useState<boolean>(false);
  const [maisVendidos, setMaisVendidos] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      handleGetProdutos()
    }, [])
  )

  useEffect(() => {
    handleGetProdutos()
  }, [search, menorPreco, maiorPreco, maisVendidos])

  function handleGetProdutos() {
    getProdutosParaCompra(search, menorPreco, maiorPreco, maisVendidos)
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
  }

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
        marca: item.marca,
        quantidadeExistente: item.quantidade
      })} />
  }

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: Colors.backgroundDefault }}>
      <Header pagina={Consts.MERCADO} moedas={dadosUser.saldo} />
      <Filters
        onChangeText={(value: string) => setSearch(value)}
        buttons={[
          {
            text: 'Menor preço', onPress: () => {
              setMenorPreco(true);
              setMaiorPreco(false);
              setMaisVendidos(false);
            }
          },
          {
            text: 'Maior preço', onPress: () => {
              setMenorPreco(false);
              setMaiorPreco(true);
              setMaisVendidos(false);
            }
          },
          { text: 'Mais vendido', onPress: () => {
            setMenorPreco(false);
            setMaiorPreco(false);
            setMaisVendidos(true);
          } }]} />
      {
        loading ? <ActivityIndicator size={40} color={Colors.verdeEscuro} />
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
          info={`Carrinho: ${qtdItensCarrinho} iten(s)`}
          color={Colors.verdeClaro}
          destino={{ pathname: '/screens/Carrinho' }} />
        : <></>}
    </SafeAreaView>
  )
}