import { Colors } from '@/constants/Colors';
import { Tabs } from 'expo-router';
import React from 'react';
import ButtonTabBar from '../../components/ButtonTabBar/index';
import { StatusBar } from 'expo-status-bar';

export default function Tablayout() {

    return (
        <Tabs initialRouteName='index' screenOptions={{
            headerShown: false,
            tabBarInactiveBackgroundColor: Colors.lime900,
            tabBarActiveBackgroundColor: Colors.lime900,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true
        }}>
            <Tabs.Screen name="Extrato" options={{
                tabBarIcon: ({ focused }) => {
                    return <ButtonTabBar focused={focused} icon={'receipt'} />
                }
            }}/>
            <Tabs.Screen name="index" options={{
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