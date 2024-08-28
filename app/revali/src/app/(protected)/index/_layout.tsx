import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import ButtonTabBar from '@/src/components/ButtonTabBar'
import { Colors } from '@/constants/Colors'

export default function TabsLayout() {

    return (
        <Tabs initialRouteName='Home' screenOptions={{
            headerShown: false,
            tabBarInactiveBackgroundColor: Colors.verdeEscuro,
            tabBarActiveBackgroundColor: Colors.verdeEscuro,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true
        }}>
            <Tabs.Screen name="Extrato" options={{
                tabBarIcon: ({ focused }) => {
                    return <ButtonTabBar focused={focused} icon={'receipt'} />
                }
            }} />
            <Tabs.Screen name="Home" options={{
                tabBarIcon: ({ focused }) => {
                    return <ButtonTabBar focused={focused} icon={'home'} />
                }
            }} />
            <Tabs.Screen name="Mercado" options={{
                tabBarIcon: ({ focused }) => {
                    return <ButtonTabBar focused={focused} icon={'cart'} />
                }
            }} />
        </Tabs>
    )
}