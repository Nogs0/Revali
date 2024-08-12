import { Href } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import style from './style'

interface InfoBarProps {
  info: string,
  color: string,
  textColor?: string
}

export default function InfoBar(props: InfoBarProps) {
  return (
    <View style={[style.container, { backgroundColor: props.color }]}>
      <Text style={[style.label, {color: props.textColor}]}>{props.info}</Text>
    </View>
  )
}