import Header from '@/src/components/Header'
import { useApiContext } from '@/src/contexts/apiContext'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, View, Text, ActivityIndicator } from 'react-native'
import style from './style'
import Card from '@/src/components/Card'
import { Colors } from '@/constants/Colors'
import CardItem from '@/src/components/CardItem'
import { ItemMovimentacao, MovimentacaoDetalhada, Movimentacoes } from '@/src/shared/Types'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'

export default function VisualizarMovimentacao() {

  const { getMovimentacao } = useApiContext();

  const params = useLocalSearchParams();
  const [movimentacao, setMovimentacao] = useState<MovimentacaoDetalhada>();

  useEffect(() => {
    if (params.id)
      getMovimentacao(Number(params.id))
        .then((result) => {
          setMovimentacao(result);
        })
        .catch((e) => {
          showMessage({
            message: 'Falha ao carregar movimentação!',
            type: 'danger'
          })
        })
  }, [params.id])

  function renderItem(item: ItemMovimentacao) {
    return (
      <CardItem
        name={item.nome}
        quantidade={item.quantidade}
        pontos={item.pontos_gerados_item}
        classe={item.classificacao}
        image={item.pastaDeFotos}/>
    )
  }

  return (
    <SafeAreaView style={style.container}>
      {
        movimentacao?.movimentacao ? 
        <>
          <Header pagina={movimentacao?.movimentacao.isEntrada ? 'DOAÇÃO' : 'COMPRA'} back={() => router.navigate('/(protected)/Extrato')} />
          <View style={{ height: '3%' }} />
          <Card titulo={`${movimentacao?.movimentacao.pontos} - ${movimentacao?.movimentacao.isEntrada ? 'DOAÇÃO' : 'COMPRA'}`}
            conteudo={movimentacao?.movimentacao.origem}
            data={moment(movimentacao?.movimentacao.data).format('DD/MM/yyyy')}
            icone={movimentacao?.movimentacao.isEntrada ? 'add' : 'remove'}
            corIcone={movimentacao?.movimentacao.isEntrada ? Colors.verdeEscuro : Colors.red}/>
          <FlatList
            data={movimentacao.produtos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
          <View style={style.footerContainer}>
            <View style={style.lineContainer}>
              <Text style={{ fontSize: 24, fontFamily: 'Renovate', color: Colors.backgroundDefault }}>PONTOS:</Text>
              <Text style={{ fontSize: 24, fontFamily: 'Renovate', color: Colors.backgroundDefault }}>{movimentacao.movimentacao.pontos}</Text>
            </View>
          </View>
        </> : <ActivityIndicator size={40} color={Colors.verdeEscuro}/>
      }
    </SafeAreaView>
  )
}