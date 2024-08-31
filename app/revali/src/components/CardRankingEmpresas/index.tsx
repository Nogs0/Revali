import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useApiContext } from '@/src/contexts/apiContext';
import { RankingDoadoresDto, RankingEmpresasDto } from '@/src/shared/Types';
import { showMessage } from 'react-native-flash-message';

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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', paddingTop: '1%' }}>
                <Text style={{ fontFamily: 'Renovate', fontSize: 16, color: Colors.verdeClaro }}>{item.ranking}</Text>
                <Text style={{ fontFamily: 'Renovate', fontSize: 16, color: Colors.backgroundDefault }}>{item.empresa.nome_empresa}</Text>
                <Text style={{ fontFamily: 'Renovate', fontSize: 16, color: Colors.amarelo }}>{item.total_dinheiro_doado}</Text>
            </View>
        )
    }

    return (
        <View style={{
            borderWidth: 0.5,
            borderColor: Colors.verdeEscuro,
            backgroundColor: Colors.verdeEscuro,
            padding: 10,
            borderRadius: 15,
            width: '80%'
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
                <Text style={{ fontFamily: 'Renovate', fontSize: 14, color: Colors.amarelo }}>Pos.</Text>
                <Text style={{ fontFamily: 'Renovate', fontSize: 14, color: Colors.amarelo }}>Nome</Text>
                <Text style={{ fontFamily: 'Renovate', fontSize: 14, color: Colors.amarelo }}>Pontos</Text>
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
        </View>
    )
}