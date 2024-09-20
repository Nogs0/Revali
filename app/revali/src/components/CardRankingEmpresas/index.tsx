import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useApiContext } from '@/src/contexts/apiContext';
import { RankingDoadoresDto, RankingEmpresasDto } from '@/src/shared/Types';
import { showMessage } from 'react-native-flash-message';
import { Link } from 'expo-router';

export default function CardRankingEmpresas() {

    const { getRankingEmpresasParceiras } = useApiContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [ranking, setRanking] = useState<RankingEmpresasDto[]>();

    useEffect(() => {
        getRankingEmpresasParceiras()
            .then((result) => {
                setRanking(result)
                setLoading(false)
            })
            .catch((e) => {
                showMessage({
                    message: 'Falha ao carregar o ranking de empresas',
                    type: 'danger'
                })
            })
    }, [])

    function renderItem(item: RankingEmpresasDto) {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', paddingTop: '1%', width: '100%' }}>
                <Text style={{ fontFamily: 'Renovate', fontSize: 16, color: Colors.verdeClaro, width: '10%', textAlign: 'center' }}>{item.ranking}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Renovate', fontSize: 16, color: Colors.backgroundDefault, width: '70%', textAlign: 'center' }}>{item.empresa.nome_empresa}</Text>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontFamily: 'Renovate', fontSize: 16, color: Colors.amarelo, width: '20%', textAlign: 'center' }}>{item.total_pontos_doado}</Text>
            </View>
        )
    }

    return (
        <Link href={{
            pathname: '/Home/Ranking',
            params: {
                tipo: 1 
            }
        }} asChild>
            <TouchableOpacity style={{
                borderWidth: 0.5,
                borderColor: Colors.verdeEscuro,
                backgroundColor: Colors.verdeEscuro,
                padding: 10,
                borderRadius: 15,
                width: '80%',
                height: '40%',
                overflow: 'hidden'
            }}>
                <View style={{ borderBottomWidth: 0.5, marginHorizontal: '1%', paddingBottom: '1%', marginBottom: '1%' }}>
                    <Text style={{ fontFamily: 'Renovate', fontSize: 20, color: Colors.amarelo, textAlign: 'center' }}>Ranking de empresas parceiras</Text>
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
                    loading ? <ActivityIndicator size={40} color={Colors.backgroundDefault} /> :
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