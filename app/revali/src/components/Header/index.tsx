
import React from 'react';
import { Text, View } from 'react-native';
import style from './style';
import { Consts } from '@/src/shared/Consts';

interface HeaderProps {
    pagina: string
}

export default function Header(props: HeaderProps) {

    return (
        props.pagina != Consts.HOME ?
            <View style={style.container}>
                <Text style={style.label}>{props.pagina}</Text>
            </View>
            :
            <View style={style.container}>
                <Text style={style.label}>{props.pagina}</Text>
            </View>
    )
}