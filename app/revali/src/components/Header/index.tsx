
import { Colors } from '@/constants/Colors';
import { Consts } from '@/src/shared/Consts';
import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import style from './style';
import { Href, Link } from 'expo-router';

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
                        <TouchableOpacity style={{ position: 'absolute', left: 30, top: 45, width: 50, height: 50 }} onPress={() => props.back()}>
                            <Icon name='arrow-undo' size={20} color={'black'}></Icon>
                        </TouchableOpacity>
                        : <></>
                }
                <Text style={style.label}>{props.pagina}</Text>
            </View>
            :
            <View style={style.container}>
                <Text style={style.label}>{props.pagina}</Text>
            </View>
    )
}