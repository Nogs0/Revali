import { Colors } from '@/constants/Colors'
import Icon from '@expo/vector-icons/Ionicons'
import { Link, useNavigation } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import style from './style'
interface HeaderHomeProps {
    nomeUsuario: string,
    moedasUsuario: number,
}

export default function HeaderHome(props: HeaderHomeProps) {

    const navigation = useNavigation();

    return (
        <View style={style.container}>
            <View style={style.headerContainer}>
                <TouchableOpacity style={style.button} onPress={() => navigation.openDrawer()}>
                    <Icon name={'menu'} size={30} color={Colors.verdeEscuro}></Icon>
                </TouchableOpacity>
                <Text style={style.userName}>{props.nomeUsuario}</Text>
                <View style={style.imageContainer}>
                    <Image style={style.image} source={require('@/assets/images/logo-horizontal-verde-amarelo.png')}></Image>
                </View>
            </View>
            <View style={style.coinsContainer}>
                <Icon name='logo-usd' size={30} color={Colors.verdeEscuro}></Icon>
                <Text style={style.coins}>{props.moedasUsuario}</Text>
            </View>
        </View>
    )
}