import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/src/components/Header'
import { useApiContext } from '@/src/contexts/apiContext'
import { router, useLocalSearchParams } from 'expo-router'
import CardItem from '@/src/components/CardItem'
import { Colors } from '@/constants/Colors'
import style from './styles/styleAcompanharDoacao'
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
                classe={item.item.classificacao_id?.toString()}
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
                        <View style={style.textInfoContainer}>
                            <Text style={{ fontFamily: 'Renovate', fontSize: 24, color: Colors.verdeEscuro }}>Data:</Text>
                            <Text style={{ fontFamily: 'Raleway', fontSize: 24 }}>{moment(doacao.doacao.data).format('DD/MM/yyyy')}</Text>
                        </View>
                        <View style={style.textInfoContainer}>
                            <Text style={{ fontFamily: 'Renovate', fontSize: 24, color: Colors.verdeEscuro }}>Pontos esperados:</Text>
                            <Text style={{ fontFamily: 'Raleway', fontSize: 24 }}>{doacao.doacao.pontos_gerados.toFixed(2)}</Text>
                        </View>
                        <View style={style.textInfoContainer}>
                            <Text style={{ fontFamily: 'Renovate', fontSize: 24, color: Colors.verdeEscuro }}>Local:</Text>
                            <Text style={{ fontFamily: 'Raleway', fontSize: 24 }}>{doacao.doacao.origem}</Text>
                        </View>
                    </View>
                    <InfoBar
                        info={doacao.doacao.status == 0 ? `AGUARDANDO APROVAÇÃO` : ''}
                        color={Colors.verdeEscuro}
                        textColor={Colors.backgroundDefault}
                    />
                </>
                :
                <ActivityIndicator size={40} color={Colors.verdeEscuro} />}
        </SafeAreaView>
    )
}