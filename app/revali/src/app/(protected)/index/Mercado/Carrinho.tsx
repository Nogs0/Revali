import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from './styleCarrinho'
import Header from '@/src/components/Header'
import { Consts } from '@/src/shared/Consts'
import { ItemCarrinho, useAppContext } from '@/src/contexts/appContext'
import CardCarrinho from '@/src/components/CardCarrinho'
import InfoBar from '@/src/components/InfoBar'
import { Colors } from '@/constants/Colors'
import { Link, router } from 'expo-router'
import Icon from '@expo/vector-icons/Ionicons';
import ModalConfirmacao from '@/src/components/ModalConfirmacao'

export default function Carrinho() {

    const { itensCarrinho, qtdItensCarrinho, totalCarrinho, removeItemCarrinho, dadosUser } = useAppContext();
    const [showModalRemocao, setShowModalRemocao] = useState<boolean>(false);
    const [idParaRemover, setIdParaRemover] = useState<number>(0);

    function handleRemoverDoCarrinho(id: number) {
        setIdParaRemover(id)
        setShowModalRemocao(true)
    }

    function renderItem(item: ItemCarrinho) {
        return <CardCarrinho
            id={item.id}
            nome={item.nome}
            marca={item.marca}
            fornecedor={item.fornecedor}
            valor={item.valor}
            quantidade={item.quantidade ? item.quantidade : 1}
            imagem={item.imagem}
            handleRemoverDoCarrinho={handleRemoverDoCarrinho} />
    }

    useEffect(() => {
        if (qtdItensCarrinho == 0)
            router.navigate('/(protected)/Mercado')
    }, [qtdItensCarrinho])

    return (
        <SafeAreaView style={style.container}>
            <ModalConfirmacao
                titulo='Atenção!'
                mensagem='Você deseja realmente remover o item?'
                onOk={() => {
                    setShowModalRemocao(false);
                    removeItemCarrinho(idParaRemover);
                }}
                onCancel={() => setShowModalRemocao(false)}
                visible={showModalRemocao} />
            <Header pagina={Consts.CARRINHO} back={router.back} moedas={dadosUser.saldo}/>
            <FlatList
                data={itensCarrinho}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderItem(item)}
            />
            <Link style={style.finalizar} href='/Mercado/Finalizacao' asChild>
                <TouchableOpacity>
                    <Text style={{ fontSize: 30, fontFamily: 'Renovate'}}>Finalizar compra</Text>
                    <Icon style={{ position: 'absolute', right: 30 }} name={'arrow-redo-sharp'} size={30} color={'black'}></Icon>
                </TouchableOpacity>
            </Link>
            <InfoBar
                info={`${qtdItensCarrinho} itens - ${totalCarrinho} pontos`}
                color={Colors.verdeEscuro}
                textColor={Colors.backgroundDefault}
            />
        </SafeAreaView>
    )
}