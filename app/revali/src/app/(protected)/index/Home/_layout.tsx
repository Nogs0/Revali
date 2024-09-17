import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function StackHome() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='DoacoesEmAndamento' />
            <Stack.Screen name='AcompanharDoacao' />
            <Stack.Screen name='Ranking' />
        </Stack>
    )
}