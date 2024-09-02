import { Colors } from '@/constants/Colors'
import Header from '@/src/components/Header'
import { useApiContext } from '@/src/contexts/apiContext'
import { ItemCarrinho, useAppContext } from '@/src/contexts/appContext'
import Icon from '@expo/vector-icons/Ionicons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import style from './style'
import { ProdutosResgate } from '@/src/shared/Types'
import ImagensLogoProex from '@/src/components/ImagensLogoProex'

export default function Item() {

    const params = useLocalSearchParams();
    const { getItemParaCompra } = useApiContext();
    const { addItemCarrinho } = useAppContext();
    const [item, setItem] = useState<ProdutosResgate>();
    const [mainImage, setMainImage] = useState<any>();
    const [imagens, setImagens] = useState<any[]>([])

    useEffect(() => {
        if (params.id)
            getItemParaCompra(Number(params.id))
                .then((result) => {
                    setItem(result);
                    setMainImage(result.pastaDeFotos)
                })
                .catch((e) => {
                    console.error(e);
                })
    }, [])

    function renderImage(item: any) {
        return (
            <TouchableOpacity style={style.imageContainer} onPress={() => setMainImage(item)}>
                <Image style={style.image} source={{ uri: item }} />
            </TouchableOpacity>
        )
    }

    function addItemToCarrinho() {
        if (item)
            addItemCarrinho({
                id: item.id,
                imagem: item.pastaDeFotos,
                nome: item.nome,
                marca: item.marca,
                fornecedor: item.fornecedor,
                valor: item.valor,
                quantidade: 1
            } as ItemCarrinho);
        router.navigate('/screens/Carrinho')
    }

    return (
        <SafeAreaView style={style.container} >
            <Header pagina='ITEM' back={() => router.navigate('/(protected)/Mercado')} />
            {
                !item ?
                    <ActivityIndicator size={40} color={Colors.verdeEscuro} />
                    :
                    <>
                        <ScrollView style={{ height: '100%' }} contentContainerStyle={style.content}>
                            <View style={{ width: '80%' }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{`${item.nome} - ${item.marca}`.toUpperCase()}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>Fornecido por {item.fornecedor}</Text>
                                </View>
                            </View>
                            <Image
                                style={style.mainImage}
                                source={{ uri: item.pastaDeFotos }} />
                            <View style={style.descriptionContainer}>
                                <Text style={{ fontSize: 18, textAlign: 'justify', color: 'black' }}>{item.descricao}</Text>
                            </View>
                            <View>
                                <Image style={{ height: 80, width: 120 }} source={require('@/assets/images/logo-verde-amarelo.png')}></Image>
                            </View>
                            <ImagensLogoProex height={150} />
                        </ScrollView>
                        <View style={style.footerContainer}>
                            <View style={style.coinsContainer}>
                                <Icon name={'logo-usd'} color={Colors.verdeClaro} size={25} />
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: Colors.backgroundDefault }}>{item.valor}</Text>
                            </View>
                            <TouchableOpacity style={style.buttonContainer} onPress={() => addItemToCarrinho()}>
                                <Icon name={'cart'} color={Colors.backgroundDefault} size={30} />
                            </TouchableOpacity>
                        </View>
                    </>
            }
        </SafeAreaView >
    )
}