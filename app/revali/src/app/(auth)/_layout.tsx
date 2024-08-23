import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'

export default function Layout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='index'/>
      <Stack.Screen name='Cadastro'/>
    </Stack>
  )
}