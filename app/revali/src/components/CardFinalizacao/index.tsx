import { View, Text, Image } from 'react-native'
import React from 'react'
import style from './style'

interface CardFinalizacaoProps {
    imagem: any,
    quantidade: number
}

export default function CardFinalizacao(props: CardFinalizacaoProps) {
    return (
        <View style={style.container}>
            <View style={style.imageContainer}>
                <Image style={style.image} source={props.imagem} />
                <View style={style.quantidadeContainer}>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>{props.quantidade}x</Text>
                </View>
            </View>
        </View>
    )
}