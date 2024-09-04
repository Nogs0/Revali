import { View, Text, OpaqueColorValue, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import style from './style'
import Icon from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'

interface CardRankingProps {
    posicao: number,
    nome: string,
    pontos: number,
    imagem?: string
}

export default function CardRanking(props: CardRankingProps) {

    function getImage(posicao: number): ImageSourcePropType {
        switch (posicao) {
            case 1: return require('@/assets/images/gold-medal.png');
            case 2: return require('@/assets/images/silver-medal.png');
            default: return require('@/assets/images/bronze-medal.png');
        };
    }

    return (
        <View style={style.container}>
            <View style={style.bodyContainer}>
                {
                    props.posicao <= 3 ?
                        <Image style={{ width: 30, height: 40 }} source={getImage(props.posicao)} />
                        :
                        <Text style={{ width: 30, height: 40, fontFamily: 'Renovate', fontSize: 20, color: Colors.verdeClaro, textAlign: 'center' }}>{props.posicao}</Text>
                }
                {props.imagem ?
                    <Image style={{ width: 50, height: 40 }} source={{ uri: props.imagem }} />
                    :
                    <Text style={{ fontSize: 18, fontFamily: 'Renovate', color: Colors.verdeEscuro, width: '40%', textAlign: 'center' }}>{props.nome}</Text>
                }
                <Text style={{ fontSize: 18, fontFamily: 'Renovate', color: Colors.verdeEscuro, width: '20%', textAlign: 'center' }}>{props.pontos}</Text>
            </View>
        </View>
    )
}