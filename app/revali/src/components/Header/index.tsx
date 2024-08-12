
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
    pageToBack?: Href<string | object>
}

export default function Header(props: HeaderProps) {

    return (
        props.pagina != Consts.HOME ?
            <View style={style.container}>
                {props.moedas ?
                    <View style={style.coinsContainer}>
                        <Icon name='logo-usd' color={Colors.lime900} size={20}></Icon>
                        <Text style={style.coins}>{props.moedas}</Text>
                    </View> : <></>
                }
                {
                    props.pageToBack ?
                        <Link style={{position: 'absolute', left: 30}} href={props.pageToBack} asChild>
                            <TouchableOpacity>
                                <Icon name='arrow-undo' size={30} color={'black'}></Icon>
                            </TouchableOpacity>
                        </Link>
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