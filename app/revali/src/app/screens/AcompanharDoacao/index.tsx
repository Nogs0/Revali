import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/src/components/Header'
import { useApiContext } from '@/src/contexts/apiContext'
import { router, useLocalSearchParams } from 'expo-router'
import CardItem from '@/src/components/CardItem'
import { Colors } from '@/constants/Colors'
import style from './style'
import InfoBar from '@/src/components/InfoBar'
import { Doacao, DoacaoDetalhada, ItemDoacao } from '@/src/shared/Types'
import moment from 'moment'

export default function AcompanharDoacao() {

    const params = useLocalSearchParams();

    const { getDoacao } = useApiContext();
    const [doacao, setDoacao] = useState<DoacaoDetalhada>();

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

    function renderItem(item: ItemDoacao) {
        return (
            <CardItem
                name={item.produto.nome_produto}
                quantidade={item.item.quantidade}
                pontos={item.item.pontos_gerados_item}
                classe={'item.classe'}
                unidade={item.item.unidade_de_medida}
                image={item.produto.pastaDeFotos} />
        )
    }

    return (
        <SafeAreaView style={style.container}>
            <Header pagina='ACOMPANHAMENTO' back={router.back} />
            {doacao != undefined ?
                <>
                    <FlatList
                        data={doacao.itens}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => renderItem(item)}
                    />
                    <View style={style.infoContainer}>
                        <Text style={{ fontSize: 14, color: Colors.lime900, fontWeight: 'bold' }}>Data:</Text>
                        <Text style={{ fontSize: 20 }}>{moment(doacao.doacao.data).format('DD/MM/yyyy')}</Text>
                        <Text style={{ fontSize: 14, color: Colors.lime900, fontWeight: 'bold' }}>Pontos esperados:</Text>
                        <Text style={{ fontSize: 20 }}>{doacao.doacao.pontos_gerados.toFixed(2)}</Text>
                        <Text style={{ fontSize: 14, color: Colors.lime900, fontWeight: 'bold' }}>Local:</Text>
                        <Text style={{ fontSize: 20 }}>{doacao.doacao.origem}</Text>
                    </View>
                    <InfoBar
                        info={doacao.doacao.status == 0 ? `AGUARDANDO APROVAÇÃO` : ''}
                        color={Colors.lime900}
                        textColor={'white'}
                    />
                </>
                :
                <ActivityIndicator size={40} color={Colors.lime900} />}
        </SafeAreaView>
    )
}