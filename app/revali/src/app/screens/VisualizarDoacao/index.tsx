import Header from '@/src/components/Header'
import { useApiContext } from '@/src/contexts/apiContext'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, View, Text } from 'react-native'
import style from './style'
import Card from '@/src/components/Card'
import { Colors } from '@/constants/Colors'
import CardItem from '@/src/components/CardItem'

export default function VisualizarDoacao() {

  const { getMovimentacao } = useApiContext();

  const params = useLocalSearchParams();
  const [item, setItem] = useState<any>({});

  useEffect(() => {
    if (params.id)
      getMovimentacao(Number(params.id))
        .then((result) => {
          setItem(result);
        })
        .catch((e) => {
          console.error(e);
        })
  })

  function renderItem(item: any) {
    return (
      <CardItem
        name={item.nome}
        quantidade={item.quantidade}
        pontos={item.pontos}
        classe={item.classe}
        unidade={item.unidade}
        image={item.imagem} />
    )
  }

  return (
    <SafeAreaView style={style.container}>
      <Header pagina={item.isEntrada ? 'DOAÇÃO' : 'COMPRA'} back={router.back} />
      <View style={{ height: '3%' }} />
      <Card titulo={`${item.pontos} - ${item.isEntrada ? 'DOAÇÃO' : 'COMPRA'}`}
        conteudo={item.origem}
        data={item.data}
        icone={item.isEntrada ? 'add' : 'remove'}
        corIcone={item.isEntrada ? Colors.lime900 : Colors.red}
        onPress={() => router.navigate({ pathname: '/screens/AcompanharDoacao', params: { id: item.id } })} />
      <FlatList
        data={item.itens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
      <View style={style.footerContainer}>
        <View style={style.lineContainer}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>PONTOS</Text>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>{item.pontos}</Text>
        </View>
        <View style={style.lineContainer}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>QUANTIDADE</Text>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>{item.quantidade}{item.unidade}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}