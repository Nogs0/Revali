import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/src/components/Header'
import { useApiContext } from '@/src/contexts/apiContext'
import { router, useLocalSearchParams } from 'expo-router'
import CardItem from '@/src/components/CardItem'
import { Colors } from '@/constants/Colors'
import style from './style'
import InfoBar from '@/src/components/InfoBar'
import { Doacao } from '@/src/shared/Types'

export default function AcompanharDoacao() {

    const params = useLocalSearchParams();

    const { getDoacao } = useApiContext();
    const [doacao, setDoacao] = useState<Doacao>();

    useEffect(() => {
        if (params.id)
            getDoacao(Number(params.id))
                .then((result) => {
                    setDoacao(result)
                })
                .catch((e) => {
                    console.error(e)
                })
    }, [])

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
        doacao ?
            <SafeAreaView style={style.container}>
                <Header pagina='ACOMPANHAMENTO' back={router.back} />
                <FlatList
                    data={[]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => renderItem(item)}
                />
                <View style={style.infoContainer}>
                    <Text style={{fontSize: 14, color: Colors.lime900, fontWeight: 'bold'}}>Data:</Text>
                    <Text style={{fontSize: 20}}>{doacao.data.toString()}</Text>
                    <Text style={{fontSize: 14, color: Colors.lime900, fontWeight: 'bold'}}>Pontos esperados:</Text>
                    <Text style={{fontSize: 20}}>{doacao.pontos_gerados}</Text>
                    <Text style={{fontSize: 14, color: Colors.lime900, fontWeight: 'bold'}}>Local:</Text>
                    <Text style={{fontSize: 20}}>{'doacao.origem'}</Text>
                </View>
                <InfoBar
                    info={doacao.status == 1 ? `AGUARDANDO APROVAÇÃO` : ''}
                    color={Colors.lime900}
                    textColor={'white'}
                />
            </SafeAreaView>
            : <ActivityIndicator size={40} color={Colors.lime900} />
    )
}