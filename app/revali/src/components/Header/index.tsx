
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
                {
                    props.moedas != null && !props.back ?
                        <View style={style.infoLeftContainer}>
                            <Icon name='logo-usd' color={Colors.verdeEscuro} size={15}></Icon>
                            <Text style={style.coins}>{props.moedas}</Text>
                        </View> :
                        props.moedas == null && props.back ?
                            <TouchableOpacity style={style.buttonContainer} onPress={() => props.back()}>
                                <Icon name='arrow-undo' size={27} color={'black'}></Icon>
                            </TouchableOpacity>
                            :
                            <>
                                <View style={{position: 'absolute', right: 30, top: 55, justifyContent: 'center', flexDirection: 'row' }}>
                                    <Icon name='logo-usd' color={Colors.verdeEscuro} size={20}></Icon>
                                    <Text style={style.coins}>{props.moedas}</Text>
                                </View>
                                <TouchableOpacity style={style.buttonContainer} onPress={() => props.back()}>
                                    <Icon name='arrow-undo' size={27} color={'black'}></Icon>
                                </TouchableOpacity>
                            </>
                }
                <Text style={style.label}>{props.pagina}</Text>
            </View>
            :
            <View style={style.container}>
                <Text style={style.label}>{props.pagina}</Text>
            </View>
    )
}