import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/src/components/Header'
import style from './style'
import { useApiContext } from '@/src/contexts/apiContext'
import { Link, useLocalSearchParams } from 'expo-router'
import { Colors } from '@/constants/Colors'

export default function Item() {

  const params = useLocalSearchParams();
  const { getItemParaCompra } = useApiContext();
  const [item, setItem] = useState<any>({});

  useEffect(() => {
    console.log(params.id)
    if (params.id)
      getItemParaCompra(Number(params.id))
        .then((result) => {
          setItem(result);
        })
        .catch((e) => {
          console.error(e);
        })
  }, [])

  function renderImage(item: any) {
    return (
      <TouchableOpacity style={style.imageContainer}>
        <Image style={style.image} source={item} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={style.container}>
      {item ?
        <>
          <Header pagina='ITEM' pageToBack={{ pathname: '/(tabs)/Mercado' }} />
          <View style={style.content}>
            <View style={{ width: '80%' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.nome} - {item.marca}</Text>
              <Text style={{ fontSize: 18 }}>Fornecido por {item.fornecedor}</Text>
            </View>
            <Image
              style={style.mainImage}
              source={item.imagens ? item.imagens[0] : require('../../../../assets/images/favicon.png')} />
            <FlatList
              horizontal
              data={item.imagens}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => renderImage(item)} />
            <View style={style.descriptionContainer}>
              <Text style={{ fontSize: 18 }}>{item.descricao}</Text>
            </View>
            <View>
              <Link href={''} asChild>
              </Link>
            </View>
          </View>
        </> : <ActivityIndicator size={40} color={Colors.lime900} />
      }
    </View>
  )
}