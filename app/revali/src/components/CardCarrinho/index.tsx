import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import style from './style'
import Icon from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'
import { useAppContext } from '@/src/contexts/appContext'
import ModalConfirmacao from '../ModalConfirmacao'
import { Link } from 'expo-router'

interface CardCarrinhoProps {
    id: number,
    imagem: any,
    valor: number,
    quantidade: number,
    nome: string,
    marca: string,
    fornecedor: string,
    handleRemoverDoCarrinho: any
}

export default function CardCarrinho(props: CardCarrinhoProps) {

    const { removeItemCarrinho, addItemDiretoCarrinho } = useAppContext();

    function handleRemoveItemCarrinho(id: number) {
        if (props.quantidade == 1)
            props.handleRemoverDoCarrinho(id);
        else removeItemCarrinho(id)
    }

    return (
        <View style={style.container}>
            <Link href={{ pathname: '/screens/Item', params: { id: props.id } }} asChild>
                <TouchableOpacity>
                    <Image source={{ uri: props.imagem}} style={style.imagem}></Image>
                </TouchableOpacity>
            </Link>
            <View style={style.cotentContainer}>
                <View style={style.titleContainer}>
                    <Text style={style.name}>{props.nome} {props.marca}</Text>
                    <Text style={{fontFamily: 'Raleway'}}>Fornecido por {props.fornecedor}</Text>
                </View>
                <Text style={{ fontSize: 16, fontFamily: 'Raleway' }}>{props.valor}/un</Text>
                <View style={style.addItensContainer}>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginRight: 5 }} onPress={() => handleRemoveItemCarrinho(props.id)}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: Colors.red, textAlign: 'center' }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ backgroundColor: Colors.verdeClaro, width: 20, textAlign: 'center', borderRadius: 5, fontFamily: 'Raleway' }}>{props.quantidade}</Text>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 5 }} onPress={() => addItemDiretoCarrinho(props.id)}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: Colors.verdeEscuro, textAlign: 'center' }}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.footerContainer}>
                    <Text style={style.coins}>Total {props.valor * props.quantidade} Pontos</Text>
                </View>
            </View>
        </View>
    )
}