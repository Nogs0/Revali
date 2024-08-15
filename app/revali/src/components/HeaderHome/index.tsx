import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import Icon from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router'

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
                <Link href={'/screens/Notificacoes'} asChild>
                    <TouchableOpacity>
                        <Icon name='notifications' size={30} color={'black'}></Icon>
                    </TouchableOpacity>
                </Link>
            </View>
            <View style={style.coinsContainer}>
                <Icon name='logo-usd' size={30} color={Colors.lime900}></Icon>
                <Text style={style.coins}>{props.moedasUsuario}</Text>
            </View>
        </View>
    )
}