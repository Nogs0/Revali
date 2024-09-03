import CardRanking from '@/src/components/CardRanking';
import { useApiContext } from '@/src/contexts/apiContext';
import { RankingDoadoresDto, RankingEmpresasDto } from '@/src/shared/Types';
import Icon from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import style from './style';

export default function Ranking() {

    const params = useLocalSearchParams();
    const { getRankingDoadores, getRankingEmpresasParceiras } = useApiContext();
    const [isEmpresa] = useState<boolean>(Number(params.tipo) == 1)
    const [empresas, setEmpresas] = useState<RankingEmpresasDto[]>([]);
    const [doadores, setDoadores] = useState<RankingDoadoresDto[]>([]);

    useEffect(() => {
        if (isEmpresa) {
            getRankingEmpresasParceiras()
                .then((result) => {
                    setEmpresas(result)
                })
        } else {
            getRankingDoadores()
                .then((result) => {
                    setDoadores(result);
                })
        }
    }, []);

    function renderEmpresa(item: RankingEmpresasDto) {

        return (
            <CardRanking
                nome={item.empresa.nome_empresa}
                posicao={item.ranking}
                pontos={item.total_dinheiro_doado}
                imagem={item.empresa.pastaDeFotos}
            />
        )
    }

    function renderDoador(item: RankingDoadoresDto) {

        return (
            <CardRanking
                nome={item.doador.nome}
                posicao={item.ranking}
                pontos={item.pontos_gerados}
            />
        )
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.headerContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <TouchableOpacity style={style.buttonContainer} onPress={() => router.navigate('/(protected)/')}>
                        <Icon name={'arrow-undo'} size={27} color={'black'} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 24,
                        fontFamily: 'Renovate'
                    }}>{isEmpresa ? 'Ranking de empresas' : 'Ranking de doadores'}</Text>
                </View>
                <View style={style.imageContainer}>
                    <Image style={{ width: isEmpresa ? 190 : 140, height: 160 }} source={isEmpresa ? require('@/assets/images/trator.png') : require('@/assets/images/frutas-sem-fundo.png')} />
                </View>
            </View>
            <View style={style.listContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%', marginTop: '4%' }}>
                    <Text style={{ fontSize: 24, fontFamily: 'Renovate', width: '30%'}}>Pos.</Text>
                    <Text style={{ fontSize: 24, fontFamily: 'Renovate', width: '40%' }}>{isEmpresa ? 'Empresa' : 'Doador'}</Text>
                    <Text style={{ fontSize: 24, fontFamily: 'Renovate', width: '20%' }}>Pontos</Text>
                </View>
                {
                    isEmpresa ?
                        <FlatList
                            style={{ marginBottom: '10%' }}
                            data={empresas}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => renderEmpresa(item)} />
                        :
                        <FlatList
                            style={{ marginBottom: '10%' }}
                            data={doadores}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => renderDoador(item)} />
                }
            </View>
        </SafeAreaView>
    )
}