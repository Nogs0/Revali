import { Colors } from '@/constants/Colors'
import CardRankingDoadores from '@/src/components/CardRankingDoadores'
import CardRankingEmpresas from '@/src/components/CardRankingEmpresas'
import HeaderHome from '@/src/components/HeaderHome'
import { useApiContext } from '@/src/contexts/apiContext'
import { useAppContext } from '@/src/contexts/appContext'
import { useAuthContext } from '@/src/contexts/authContext'
import { router, useFocusEffect } from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import { ActivityIndicator, Dimensions, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'

export default function Home() {
  const { token } = useAuthContext();
  const { setDadosUser, dadosUser } = useAppContext();
  const { getDadosUsuarioLogado } = useApiContext();

  useFocusEffect(
    useCallback(() => {
      if (token) {
        getDadosUsuarioLogado()
          .then((result) => {
            setDadosUser(result)
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
              <TouchableOpacity style={{ borderRadius: 20, backgroundColor: Colors.amarelo, alignItems: 'center', justifyContent: 'center', padding: '2%', height: '8%', marginTop: 20 }} onPress={() => router.navigate({ pathname: '/screens/Doacoes' })}>
                <Text style={{ fontFamily: 'Raleway', fontSize: 20 }}>Doações em andamento</Text>
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