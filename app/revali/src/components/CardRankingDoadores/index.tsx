import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useApiContext } from '@/src/contexts/apiContext'
import { Doador, RankingDoadoresDto } from '@/src/shared/Types';
import { showMessage } from 'react-native-flash-message';
import { Link } from 'expo-router';

export default function CardRankingDoadores() {

    const { getRankingDoadores } = useApiContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [ranking, setRanking] = useState<RankingDoadoresDto[]>();

    useEffect(() => {
        getRankingDoadores()
            .then((result) => {
                setRanking(result);
                setLoading(false)
            })
            .catch((e) => {
                showMessage({
                    message: 'Falha ao carregar o ranking de doadores',
                    type: 'danger'
                })
            })
    }, [])

    function renderItem(item: RankingDoadoresDto) {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', paddingTop: '1%' }}>
                <Text style={{ fontFamily: 'Renovate', fontSize: 16, color: Colors.verdeClaro, textAlign: 'center', width: '10%' }}>{item.ranking}</Text>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontFamily: 'Renovate', fontSize: 16, color: Colors.backgroundDefault, textAlign: 'center', width: '70%' }}>{item.doador.nome}</Text>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontFamily: 'Renovate', fontSize: 16, color: Colors.amarelo, textAlign: 'center', width: '20%' }}>{item.pontos_gerados}</Text>
            </View>
        )
    }

    return (
        <Link href={{pathname: '/Home/Ranking', params: {
            tipo: 2
        }}} asChild>
            <TouchableOpacity style={{
                borderWidth: 0.5,
                borderColor: Colors.verdeEscuro,
                backgroundColor: Colors.verdeEscuro,
                padding: 10,
                borderRadius: 15,
                width: '80%',
                margin: '15%',
                height: '40%',
                overflow: 'hidden'
            }}>
                <View style={{ borderBottomWidth: 0.5, marginHorizontal: '1%', paddingBottom: '1%', marginBottom: '1%' }}>
                    <Text style={{ fontFamily: 'Renovate', fontSize: 20, color: Colors.amarelo, textAlign: 'center' }}>Ranking de doadores</Text>
                </View>
                <View style={{
                    borderBottomWidth: 0.5,
                    marginHorizontal: '1%',
                    paddingHorizontal: '3%',
                    paddingBottom: '1%',
                    marginBottom: '1%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{ fontFamily: 'Renovate', fontSize: 12, color: Colors.amarelo, width: '10%', textAlign: 'center' }}>Pos</Text>
                    <Text style={{ fontFamily: 'Renovate', fontSize: 12, color: Colors.amarelo, width: '70%', textAlign: 'center' }}>Nome</Text>
                    <Text style={{ fontFamily: 'Renovate', fontSize: 12, color: Colors.amarelo, width: '20%', textAlign: 'center' }}>Pontos</Text>
                </View>
                {
                    loading ? <ActivityIndicator size={40} color={Colors.verdeEscuro} /> :
                        <View>
                            <FlatList
                                data={ranking?.filter(x => x.ranking <= 5)}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => renderItem(item)}
                            />
                        </View>
                }
            </TouchableOpacity>
        </Link>

    )
}