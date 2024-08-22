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

export default function Item() {

    const params = useLocalSearchParams();
    const { getItemParaCompra } = useApiContext();
    const { addItemCarrinho } = useAppContext();
    const [item, setItem] = useState<ProdutosResgate>({} as ProdutosResgate);
    const [mainImage, setMainImage] = useState<any>(require('@/assets/images/favicon.png'));
    const [imagens, setImagens] = useState<any[]>([])

    useEffect(() => {
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
            <TouchableOpacity style={style.imageContainer} onPress={() => setMainImage(item)}>
                <Image style={style.image} source={item} />
            </TouchableOpacity>
        )
    }

    function addItemToCarrinho() {
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
        <SafeAreaView style={style.container}>
            {item ?
                <>
                    <Header pagina='ITEM' back={router.back} />
                    <ScrollView contentContainerStyle={style.content}>
                        <View style={{ width: '80%' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.nome} - {item.marca}</Text>
                            <Text style={{ fontSize: 18 }}>Fornecido por {item.fornecedor}</Text>
                        </View>
                        <Image
                            style={style.mainImage}
                            source={mainImage} />
                        <View style={{ height: 100 }}>
                            <FlatList
                                horizontal
                                data={imagens}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => renderImage(item)} />
                        </View>
                        <View style={style.descriptionContainer}>
                            <Text style={{ fontSize: 18, textAlign: 'justify', color: 'black' }}>{item.descricao}</Text>
                        </View>
                    </ScrollView>
                    <View style={style.footerContainer}>
                        <View style={style.coinsContainer}>
                            <Icon name={'logo-usd'} color={Colors.lime300} size={25} />
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>{item.valor}</Text>
                        </View>
                        <TouchableOpacity style={style.buttonContainer} onPress={() => addItemToCarrinho()}>
                            <Icon name={'cart'} color={'white'} size={30} />
                        </TouchableOpacity>
                    </View>
                </>
                : <ActivityIndicator size={40} color={Colors.lime900} />
            }
        </SafeAreaView>
    )
}