import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import style from './style'
import Icon from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { buttonType } from '@/src/contexts/appContext';

interface FilterProps {
    buttons?: buttonType[],
    onChangeText: any
}

export default function Filters(props: FilterProps) {
    return (
        <View style={style.container}>
            <View style={style.searchContainer}>
                <Icon name='search' size={20} color={Colors.grey}></Icon>
                <TextInput style={style.textSearch} onChangeText={props.onChangeText}></TextInput>
            </View>
            {props.buttons ?
                <View style={style.buttonsContainer}>
                    <TouchableOpacity style={style.button} onPress={props.buttons[0].onPress}>
                        <Text style={style.textButton}>{props.buttons[0].text}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={props.buttons[1].onPress}>
                        <Text style={style.textButton}>{props.buttons[1].text}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={props.buttons[2].onPress}>
                        <Text style={style.textButton}>{props.buttons[2].text}</Text>
                    </TouchableOpacity>
                </View>
                : <></>}
        </View>
    )
}