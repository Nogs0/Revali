import { Colors } from '@/constants/Colors'
import CardRankingDoadores from '@/src/components/CardRankingDoadores'
import CardRankingEmpresas from '@/src/components/CardRankingEmpresas'
import HeaderHome from '@/src/components/HeaderHome'
import { useApiContext } from '@/src/contexts/apiContext'
import { useAppContext } from '@/src/contexts/appContext'
import { useAuthContext } from '@/src/contexts/authContext'
import { router, useFocusEffect } from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'

export default function Home() {

  const { token } = useAuthContext();
  const { setDadosUser, dadosUser } = useAppContext();
  const { getDadosUsuarioLogado } = useApiContext();

  useFocusEffect(
    useCallback(() => {
      console.log(token)
      if (token) {
        getDadosUsuarioLogado()
          .then((result) => {
            setDadosUser((prev) => {
              prev.user = result.user
              prev.quantidade_doacoes = result.quantidade_doacoes;
              prev.quantidade_resgates = result.quantidade_resgates;
              prev.doador_id = 5;
              return prev;
            })
            console.log(result)
          })
          .catch((e) => {
            showMessage({
              message: 'Falha ao carregar os dados do usuário',
              type: 'danger'
            })
          })
      }
    }, [])
  );

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: Colors.backgroundDefault }}>
      {
        dadosUser ?
          <>
            <HeaderHome nomeUsuario={dadosUser.user?.name} moedasUsuario={dadosUser?.saldo} />
            <View style={{ height: '80%', alignItems: 'center' }}>
              <TouchableOpacity style={{ borderRadius: 20, backgroundColor: Colors.amarelo, alignItems: 'center', justifyContent: 'center', width: '70%', height: '8%', marginTop: 20 }} onPress={() => router.navigate({ pathname: '/screens/Doacoes' })}>
                <Text style={{ fontSize: 24, fontFamily: 'Raleway' }}>Doações em andamento</Text>
              </TouchableOpacity>
              <View style={{
                width: '100%',
                height: '70%',
                alignItems: 'center',
                marginTop: '5%',
                justifyContent: 'space-evenly'
              }}>
                <CardRankingDoadores />
                <CardRankingEmpresas />
              </View>
            </View>
          </> : <ActivityIndicator size={40} color={Colors.verdeEscuro} />
      }
    </SafeAreaView>
  )
}