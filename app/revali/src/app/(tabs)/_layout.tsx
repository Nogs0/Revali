import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import ButtonTabBar from '../../components/ButtonTabBar/index';
import { Colors } from '@/constants/Colors';
import { useAppContext } from '@/src/contexts/appContext';

export default function Tablayout() {
    const { setTabSelected } = useAppContext();

    return (
        <Tabs screenOptions={{ headerShown: false, tabBarInactiveBackgroundColor: Colors.lime900, tabBarActiveBackgroundColor: Colors.lime900, tabBarShowLabel: false }}>
            <Tabs.Screen name="Extrato" options={{
                tabBarIcon: ({ focused }) => {
                    () => setTabSelected(1);
                    return <ButtonTabBar focused={focused} icon={'receipt'} />
                }
            }} />
            <Tabs.Screen name="index" options={{
                tabBarIcon: ({ focused }) => {
                    () => setTabSelected(0);
                    return <ButtonTabBar focused={focused} icon={'home'} />
                }
            }} />
            <Tabs.Screen name="Mercado" options={{
                tabBarIcon: ({ focused }) => {
                    () => setTabSelected(2);
                    return <ButtonTabBar focused={focused} icon={'cart'} />
                }
            }} />
        </Tabs>
    )
}