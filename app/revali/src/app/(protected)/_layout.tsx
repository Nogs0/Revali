import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import { useAppContext } from '@/src/contexts/appContext';
import { useAuthContext } from '@/src/contexts/authContext';
import ModalConfirmacao from '@/src/components/ModalConfirmacao';

export default function Layout() {

    const { logout } = useAuthContext();
    const { retornaEstadoInicial } = useAppContext();
    const [modalSair, setModalSair] = useState<boolean>(false)


    function CustomDrawerContent(props: any) {
        return (
            <>
                <ModalConfirmacao
                    visible={modalSair}
                    titulo='Atenção!'
                    mensagem='Deseja realmente sair?'
                    onOk={() => {
                        logout();
                        retornaEstadoInicial();
                    }}
                    onCancel={() => setModalSair(false)} />

                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                <TouchableOpacity style={{ marginLeft: '5%', marginBottom: '5%', flexDirection: 'row' }} onPress={() => setModalSair(true)}>
                    <Text style={{ fontSize: 30, fontFamily: 'Renovate', color: Colors.verdeClaro, marginRight: '5%' }}>Sair</Text>
                    <Icon name={'log-out'} size={30} color={Colors.verdeClaro} />
                </TouchableOpacity>
            </>

        );
    }

    return (
        <Drawer screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: Colors.verdeClaro,
            drawerActiveTintColor: Colors.verdeEscuro,
            drawerInactiveTintColor: Colors.backgroundDefault,
            drawerStyle: {
                backgroundColor: Colors.verdeEscuro,
            },
            drawerLabelStyle: {
                fontFamily: 'Renovate',
                fontSize: 20
            },
            swipeEnabled: false
        }} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name='index'
                options={{
                    drawerLabel: 'Início',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name='home' color={color} size={size} />
                    )
                }}
            />
            <Drawer.Screen
                name='Perfil'
                options={{
                    drawerLabel: 'Perfil',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name='person' color={color} size={size} />
                    )
                }}
            />
        </Drawer>
    )
}