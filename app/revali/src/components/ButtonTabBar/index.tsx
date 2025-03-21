import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import Icon from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'

export type ButtonTabBarProps = {
    focused: boolean,
    icon: string,
}

export default function Tab(props: ButtonTabBarProps) {
    return (
        <View style={[style.container, { backgroundColor: props.focused ? Colors.verdeClaro : Colors.verdeEscuro }]}>
            <Icon name={props.icon} color={Colors.backgroundDefault} size={40}></Icon>
        </View>
    )
}