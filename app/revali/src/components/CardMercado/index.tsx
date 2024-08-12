import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import Icon from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

interface CardMercadoProps {
    imagem: any,
    nome: string,
    marca: string,
    fornecedor: string,
    valor: number,
    onPress: () => any,
    onPressButton: () => any
}

export default function CardMercado(props: CardMercadoProps) {
    return (
        <TouchableOpacity style={style.container} onPress={props.onPress}>
            <Image source={props.imagem} style={style.imagem}></Image>
            <View style={style.cotentContainer}>
                <View style={style.titleContainer}>
                    <Text style={style.name}>{props.nome} {props.marca}</Text>
                    <Text>Fornecido por {props.fornecedor}</Text>
                </View>
                <View style={style.footerContainer}>
                    <View style={style.coinsContainer}>
                        <Icon name='logo-usd' color={Colors.lime900} size={20}></Icon>
                        <Text style={style.coins}>{props.valor}</Text>
                    </View>
                    <TouchableOpacity style={style.buttonContainer} onPress={props.onPressButton}>
                        <Icon name='cart' color={Colors.lime900} size={30}></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}