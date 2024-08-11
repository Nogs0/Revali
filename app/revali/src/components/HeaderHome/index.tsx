import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import Icon from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'

interface HeaderHomeProps {
    nomeUsuario: string,
    moedasUsuario: number
}

export default function HeaderHome(props: HeaderHomeProps) {
    return (
        <View style={style.container}>
            <View style={style.headerContainer}>
                <TouchableOpacity>
                    <Image style={style.image} source={require('@/assets/images/favicon.png')}></Image>
                </TouchableOpacity>
                <Text style={style.userName}>{props.nomeUsuario}</Text>
                <TouchableOpacity>
                    <Icon name='notifications' size={30} color={'black'}></Icon>
                </TouchableOpacity>
            </View>
            <View style={style.coinsContainer}>
                <Icon name='logo-usd' size={30} color={Colors.lime900}></Icon>
                <Text style={style.coins}>{props.moedasUsuario}</Text>
            </View>
        </View>
    )
}