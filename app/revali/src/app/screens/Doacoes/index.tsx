import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/src/components/Header'
import { router } from 'expo-router'
import style from './style'
import { useApiContext } from '@/src/contexts/apiContext'
import Card from '@/src/components/Card'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function Doacoes() {

  const { getDoacoesEmAndamento } = useApiContext();

  const [doacoes, setDoacoes] = useState<any[]>([])

  useEffect(() => {
    getDoacoesEmAndamento()
    .then((result) => {
      setDoacoes(result)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  function renderItem(item: any) {
    return (
      <Card
        titulo={`${item.pontos} - Doação`}
        conteudo={item.origem}
        data={item.data}
        icone={'hourglass-sharp'}
        corIcone={Colors.lime900}
        onPress={() => router.navigate({pathname: '/screens/AcompanharDoacao', params: {id: item.id}})}
      />
    )
  }
  
  return (
    <SafeAreaView style={style.container}>
      <Header pagina='DOAÇÕES' back={router.back} />
      <FlatList
        data={doacoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </SafeAreaView>
  )
}