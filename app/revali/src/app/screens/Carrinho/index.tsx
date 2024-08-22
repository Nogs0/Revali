import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from './style'
import Header from '@/src/components/Header'
import { Consts } from '@/src/shared/Consts'
import { useAppContext } from '@/src/contexts/appContext'
import CardCarrinho from '@/src/components/CardCarrinho'
import InfoBar from '@/src/components/InfoBar'
import { Colors } from '@/constants/Colors'
import { Link, router } from 'expo-router'
import Icon from '@expo/vector-icons/Ionicons';
import ModalConfirmacao from '@/src/components/ModalConfirmacao'

export default function Carrinho() {

    const { itensCarrinho, qtdItensCarrinho, totalCarrinho, removeItemCarrinho } = useAppContext();
    const [showModalRemocao, setShowModalRemocao] = useState<boolean>(false);
    const [idParaRemover, setIdParaRemover] = useState<number>(0);

    function handleRemoverDoCarrinho(id: number) {
        setIdParaRemover(id)
        setShowModalRemocao(true)
    }

    function renderItem(item: any) {
        return <CardCarrinho
            id={item.id}
            nome={item.nome}
            marca={item.marca}
            fornecedor={item.fornecedor}
            valor={item.valor}
            quantidade={item.quantidade}
            imagem={item.imagem}
            handleRemoverDoCarrinho={handleRemoverDoCarrinho} />
    }

    useEffect(() => {
        if (qtdItensCarrinho == 0)
            router.navigate('/(protected)/Mercado')
    }, [qtdItensCarrinho])

    return (
        <SafeAreaView style={style.container}>
            <View style={{
                height: '100%',
                position: 'absolute',
                alignContent: 'center'
            }}>
                <ModalConfirmacao
                    titulo='Atenção!'
                    mensagem='Você deseja realmente remover o item?'
                    onOk={() => {
                        console.log('aaaaaaaaa')
                        setShowModalRemocao(false);
                        removeItemCarrinho(idParaRemover);
                    }}
                    onCancel={() => setShowModalRemocao(false)}
                    visible={showModalRemocao} />
            </View>
            <Header pagina={Consts.CARRINHO} back={router.back} />
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