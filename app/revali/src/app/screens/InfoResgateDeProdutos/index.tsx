import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import ImagensLogoProex from '@/src/components/ImagensLogoProex'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'

export default function InfoResgateDeProdutos() {
    return (
        <SafeAreaView style={style.container}>
            <ImagensLogoProex height={'30%'} />
            <View style={style.contentContainer}>
                <Text style={{ fontFamily: 'Renovate', fontSize: 24, color: Colors.amarelo }}>
                    Parabéns pela sua compra!
                </Text>
                <Text style={{
                    width: '70%',
                    textAlign: 'justify',
                    color: Colors.backgroundDefault,
                    marginVertical: '5%',
                    fontFamily: 'Raleway',
                    fontSize: 24
                }}>
                    Seus produtos podem ser retirados no banco de alimentos!
                </Text>
                <Text style={{
                    width: '70%',
                    textAlign: 'justify',
                    color: Colors.backgroundDefault,
                    marginVertical: '5%',
                    fontFamily: 'Raleway',
                    fontSize: 24
                }}>
                    Lembre-se que esses produtos são frutos de sua boa ação!
                </Text>
                <TouchableOpacity style={style.button} onPress={() => router.navigate('/(protected)/Home')}>
                <Text style={{
                      textAlign: 'center',
                      color: Colors.verdeEscuro,
                      marginVertical: '5%',
                      fontFamily: 'Renovate',
                      fontSize: 20
                    }}>Obrigado!</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}