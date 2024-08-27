import { View, Text, Image } from 'react-native'
import React from 'react'
import style from './style'

interface CardItemProps {
    image: any,
    name: string,
    quantidade: number,
    unidade?: string,
    classe?: string,
    pontos: number
}

export default function CardItem(props: CardItemProps) {
    return (
        <View style={style.container}>
            <View style={style.imageContainer}>
                <Image style={style.image} source={{ uri: props.image }} />
            </View>
            <View style={style.contentContainer}>
                <Text style={{ fontSize: 24, fontFamily: 'Renovate' }}>{props.name.toUpperCase()}</Text>
                <View style={style.infoContainer}>
                    <View style={style.lineContainer}>
                        <Text style={{ fontFamily: 'Renovate' }}>QUANTIDADE:</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Raleway' }}>{props.quantidade}{props.unidade}</Text>
                    </View>
                    {props.classe ?
                        <View style={style.lineContainer}>
                            <Text style={{ fontFamily: 'Renovate' }}>CLASSIFICAÇÃO:</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'Raleway' }}>{props.classe.toUpperCase()}</Text>
                        </View>
                        : <></>
                    }
                    <View style={style.lineContainer}>
                        <Text style={{ fontFamily: 'Renovate' }}>PONTOS:</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Raleway' }}>{props.pontos}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}