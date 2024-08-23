import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import Icon from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

interface CardMercadoProps {
    imagem: any,
    nome: string,
    marca: string,
    fornecedor: string,
    valor: number,
    id: number,
    onPressButton: () => any
}

export default function CardMercado(props: CardMercadoProps) {
    return (
        <Link href={{ pathname: '/screens/Item', params: { id: props.id } }} asChild>
            <TouchableOpacity style={style.container}>
                <Image source={props.imagem ? props.imagem : require('@/assets/images/favicon.png')} style={style.imagem}></Image>
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
        </Link>
    )
}