import Card from '@/src/components/Card'
import Header from '@/src/components/Header'
import { useApiContext } from '@/src/contexts/apiContext'
import { Doacao } from '@/src/shared/Types'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import style from './style'

export default function Doacoes() {

  const { getDoacoesEmAndamento } = useApiContext();

  const [doacoes, setDoacoes] = useState<Doacao[]>([])

  useEffect(() => {
    getDoacoesEmAndamento()
    .then((result) => {
      setDoacoes(result)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  function renderItem(item: Doacao) {
    return (
      <Card
        titulo={`${item.pontos_gerados} - Doação`}
        conteudo={item.banco_de_alimento_id.toString()}
        data={item.data.toString()}
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