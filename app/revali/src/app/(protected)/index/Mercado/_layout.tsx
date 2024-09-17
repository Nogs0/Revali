import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function StackMercado() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='Item' />
            <Stack.Screen name='Carrinho' />
            <Stack.Screen name='Finalizacao' />
            <Stack.Screen name='InfoResgateDeProdutos' />
        </Stack>
    )
}