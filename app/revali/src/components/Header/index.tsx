
import { Colors } from '@/constants/Colors';
import { Consts } from '@/src/shared/Consts';
import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import style from './style';

interface HeaderProps {
    pagina: string,
    moedas?: number,
    back?: any
}

export default function Header(props: HeaderProps) {

    return (
        props.pagina != Consts.HOME ?
            <View style={style.container}>
                {props.moedas ?
                    <View style={style.coinsContainer}>
                        <Icon name='logo-usd' color={Colors.verdeEscuro} size={20}></Icon>
                        <Text style={style.coins}>{props.moedas}</Text>
                    </View> : <></>
                }
                {
                    props.back ?
                        <TouchableOpacity style={{ width: 70, height: 25, alignItems: 'center', justifyContent: 'center' }} onPress={() => props.back()}>
                            <Icon name='arrow-undo' size={27} color={'black'}></Icon>
                        </TouchableOpacity>
                        : <></>
                }
                <Text style={style.label}>{props.pagina}</Text>
                <View style={style.logoContainer}>
                    <Image style={style.logo} source={require('@/assets/images/logo-horizontal-verde-amarelo.png')} />
                </View>
            </View>
            :
            <View style={style.container}>
                <Text style={style.label}>{props.pagina}</Text>
            </View>
    )
}