import Card from '@/src/components/Card'
import Header from '@/src/components/Header'
import { useApiContext } from '@/src/contexts/apiContext'
import { Doacao } from '@/src/shared/Types'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import style from './style'
import moment from 'moment'

export default function Doacoes() {

  const { getDoacoesEmAndamento } = useApiContext();

  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    getDoacoesEmAndamento()
      .then((result) => {
        setDoacoes(result)
        setLoad(false)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  function renderItem(item: Doacao) {
    return (
      <Card
        titulo={`${item.pontos_gerados} - Doação`}
        conteudo={item.origem}
        data={moment(item.data).format(`DD/MM/yyyy`)}
        icone={'hourglass-sharp'}
        corIcone={Colors.verdeEscuro}
        onPress={() => router.navigate({ pathname: '/screens/AcompanharDoacao', params: { id: item.id } })}
      />
    )
  }

  return (
    <SafeAreaView style={style.container}>
      <Header pagina='DOAÇÕES' back={() => router.navigate('/(protected)/')} />
      { !load ?
        <FlatList
          data={doacoes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderItem(item)}
        />
        :
        <ActivityIndicator size={40} color={Colors.verdeEscuro}/>
      }
    </SafeAreaView>
  )
}