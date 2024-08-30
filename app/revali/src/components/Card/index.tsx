import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import Icon from '@expo/vector-icons/Ionicons'

interface CardProps {
    titulo: string,
    conteudo: string,
    data: string,
    icone: string,
    corIcone: string,
    onPress?: () => any
}

export default function Card(props: CardProps) {
    return (
        <TouchableOpacity style={style.container} onPress={props.onPress} disabled={!props.onPress}>
            <Icon name={props.icone} color={props.corIcone} size={30} />
            <View style={style.bodyContainer}>
                <View style={style.titleContainer}>
                    <Text style={{ fontSize: 18, fontFamily: 'Renovate' }}>{props.titulo}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'Raleway' }}>{props.data}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontFamily: 'Raleway' }}>{props.conteudo}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}