import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import { Href, Link } from 'expo-router'
import Icon from '@expo/vector-icons/Ionicons';

interface InfoBarButtonProps {
  info: string,
  color: string,
  destino: Href<string | object>
}

export default function InfoBarButton(props: InfoBarButtonProps) {
  return (
    <Link style={[style.container, { backgroundColor: props.color }]} href={props.destino} asChild>
      <TouchableOpacity>
        <Text style={style.label}>{props.info}</Text>
        <Icon name={'arrow-redo-sharp'} color={'black'} size={30} style={{position: 'absolute', right: 30}}></Icon>
      </TouchableOpacity>
    </Link>
  )
}