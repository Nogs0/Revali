import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

interface CardRankingDoadoresProps {

}

export default function CardRankingDoadores(props: CardRankingDoadoresProps) {
    return (
        <View style={{
            borderWidth: 0.5,
            borderColor: Colors.verdeEscuro,
            backgroundColor: Colors.verdeClaro,
            padding: 10,
            borderRadius: 15,
            width: '80%'
        }}>
            <View style={{borderBottomWidth: 0.5, marginHorizontal: '1%'}}>
                <Text style={{ fontFamily: 'Renovate', fontSize: 20 }}>Ranking de doadores</Text>
            </View>
            <View>
                <Text>AAAAAAAAAA</Text>
                <Text>AAAAAAAAAA</Text>
                <Text>AAAAAAAAAA</Text>
                <Text>AAAAAAAAAA</Text>
                <Text>AAAAAAAAAA</Text>
                <Text>AAAAAAAAAA</Text>
            </View>
        </View>
    )
}