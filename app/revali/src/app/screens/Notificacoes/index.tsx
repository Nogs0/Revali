import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/src/components/Header'
import { Href, router } from 'expo-router'
import style from './style'
import { useApiContext } from '@/src/contexts/apiContext'
import Card from '@/src/components/Card'
import { Colors } from '@/constants/Colors'

export default function Notificacoes() {

  const { getNotificacoes } = useApiContext();

  const [notificacoes, setNotificacoes] = useState<any[]>([])

  useEffect(() => {
    getNotificacoes()
    .then((result) => {
      setNotificacoes(result)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  function renderItem(item: any) {
    return (
      <Card
        titulo={item.titulo}
        conteudo={item.conteudo}
        data={item.data}
        icone={'alert-sharp'}
        corIcone={Colors.lime900}
        onPress={() => router.navigate(getScreenToNavigate(item))}
      />
    )
  }

  function getScreenToNavigate(item: any): Href<string | object> {
    switch (item.tela) {
      case 1:
        return '/(tabs)/Mercado';
      case 2:
        return {pathname: '/screens/AcompanharDoacao', params: {id: item.id}};
      default:
        return '/(tabs)/';
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Header pagina='NOTIFICAÇÕES' back={router.back} />
      <FlatList
        data={notificacoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </SafeAreaView>
  )
}