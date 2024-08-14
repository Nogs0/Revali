import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import style from './style'
import Icon from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'
import { useAppContext } from '@/src/contexts/appContext'
import ModalConfirmacao from '../ModalConfirmacao'

interface CardCarrinhoProps {
    id: number,
    imagem: any,
    valor: number,
    quantidade: number,
    nome: string,
    marca: string,
    fornecedor: string
}

export default function CardCarrinho(props: CardCarrinhoProps) {

    const { removeItemCarrinho, addItemDiretoCarrinho } = useAppContext();
    const [showModalConfirmacao, setShowModalConfirmacao] = useState<boolean>(false)

    function handleRemoveItemCarrinho(id: number) {
        if (props.quantidade == 1)
            setShowModalConfirmacao(true);
        else removeItemCarrinho(id)
    }

    return (
        <View style={style.container}>
            <Image source={props.imagem} style={style.imagem}></Image>
            <View style={style.cotentContainer}>
                <View style={style.titleContainer}>
                    <Text style={style.name}>{props.nome} {props.marca}</Text>
                    <Text>Fornecido por {props.fornecedor}</Text>
                </View>
                <Text style={{ fontSize: 16 }}>{props.valor}/un</Text>
                <View style={style.addItensContainer}>
                    <TouchableOpacity onPress={() => handleRemoveItemCarrinho(props.id)}>
                        <Icon name='remove' size={20} color={Colors.red} />
                    </TouchableOpacity>
                    <Text style={{ backgroundColor: Colors.lime300, width: 20, textAlign: 'center', borderRadius: 5 }}>{props.quantidade}</Text>
                    <TouchableOpacity onPress={() => addItemDiretoCarrinho(props.id)}>
                        <Icon name='add' size={20} color={Colors.lime900} />
                    </TouchableOpacity>
                </View>
                <View style={style.footerContainer}>
                    <Text style={style.coins}>Total {props.valor * props.quantidade} Pontos</Text>
                </View>
            </View>
            {showModalConfirmacao ?
                <ModalConfirmacao
                    titulo='Atenção!'
                    mensagem='Você deseja realmente remover o item?'
                    onOk={() => { setShowModalConfirmacao(false); removeItemCarrinho(props.id)}} />
                : <></>}
        </View>
    )
}