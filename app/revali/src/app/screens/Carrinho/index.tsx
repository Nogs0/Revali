import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import style from './style'
import Header from '@/src/components/Header'
import { Consts } from '@/src/shared/Consts'
import { useAppContext } from '@/src/contexts/appContext'
import CardCarrinho from '@/src/components/CardCarrinho'
import InfoBar from '@/src/components/InfoBar'
import { Colors } from '@/constants/Colors'
import { Link, router } from 'expo-router'
import Icon from '@expo/vector-icons/Ionicons';

export default function Carrinho() {

    const { itensCarrinho, qtdItensCarrinho, totalCarrinho } = useAppContext();

    function renderItem(item: any) {
        return <CardCarrinho
            id={item.id}
            nome={item.nome}
            marca={item.marca}
            fornecedor={item.fornecedor}
            valor={item.valor}
            quantidade={item.quantidade}
            imagem={item.imagem} />
    }

    useEffect(() => {
        if (qtdItensCarrinho == 0)
            router.navigate('/(tabs)/Mercado')
    }, [qtdItensCarrinho])

    return (
        <SafeAreaView style={style.container}>
            <Header pagina={Consts.CARRINHO} pageToBack={{ pathname: '/(tabs)/Mercado' }} />
            <FlatList
                data={itensCarrinho}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderItem(item)}
            />
            <Link style={style.finalizar} href='/screens/Finalizacao' asChild>
                <TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Finalizar compra</Text>
                    <Icon style={{ position: 'absolute', right: 30 }} name={'arrow-redo-sharp'} size={30} color={'black'}></Icon>
                </TouchableOpacity>
            </Link>
            <InfoBar
                info={`${qtdItensCarrinho} itens - ${totalCarrinho} pontos`}
                color={Colors.lime900}
                textColor='white'
            />
        </SafeAreaView>
    )
}