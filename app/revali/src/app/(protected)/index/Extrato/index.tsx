import { Colors } from '@/constants/Colors'
import Card from '@/src/components/Card'
import Header from '@/src/components/Header'
import InfoBar from '@/src/components/InfoBar'
import { useApiContext } from '@/src/contexts/apiContext'
import { useAppContext } from '@/src/contexts/appContext'
import { Consts } from '@/src/shared/Consts'
import { ExtratoDto, Movimentacoes } from '@/src/shared/Types'
import Icon from '@expo/vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { router, useFocusEffect } from 'expo-router'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { showMessage } from 'react-native-flash-message'

export default function Extrato() {

  const { getExtrato } = useApiContext();
  const { dadosUser, setDataExtrato, dataExtrato } = useAppContext();
  const [extrato, setExtrato] = useState<ExtratoDto>()
  const [showDateTimePicker, setShowDatetimePicker] = useState<boolean>(false);

  useEffect(() => {
    handleGetExtrato(dataExtrato)
  }, [dataExtrato])

  function handleGetExtrato(input: Date) {
    let dateToGet = `${input.getFullYear()}-${input.getMonth() + 1}-${input.getDate()}`
    getExtrato(dateToGet)
      .then((result) => {
        setExtrato(result)
      })
      .catch((e) => {
        showMessage({
          message: 'Falha ao carregar movimentações',
          type: 'danger'
        }),
          console.error(e)
      })
  }

  function renderItem(item: Movimentacoes) {
    return <Card titulo={`${item.pontos} - ${item.isEntrada ? 'Doação' : 'Compra'}`}
      conteudo={item.origem}
      data={moment(item.data).format('DD/MM/yyyy')}
      icone={item.isEntrada ? 'add' : 'remove'}
      corIcone={item.isEntrada ? Colors.verdeEscuro : Colors.red}
      onPress={item.id != 1 ? () => router.navigate({ pathname: '/Extrato/Movimentacao', params: { id: item.id } }) : undefined} />
  }

  function onChangeDate(event: any, selectedDate: any) {
    setShowDatetimePicker(false)
    setDataExtrato(selectedDate)
    handleGetExtrato(selectedDate)
  }

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: Colors.backgroundDefault }}>
      <Header pagina={Consts.EXTRATO} moedas={dadosUser.saldo} />
      {
        extrato ?
          <>
            <TouchableOpacity style={{
              borderRadius: 25,
              borderWidth: 0.5,
              borderColor: Colors.verdeEscuro,
              marginVertical: '5%',
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 30,
              height: 40,
              justifyContent: 'space-around',
            }} onPress={() => setShowDatetimePicker(true)}>
              <Text style={{ fontFamily: 'Raleway', fontSize: 20 }}>{`${dataExtrato.getDate()}/${dataExtrato.getMonth() + 1}/${dataExtrato.getFullYear()}`}</Text>
              <Icon name={'calendar'} size={20} color={Colors.verdeEscuro} />
            </TouchableOpacity>
            {showDateTimePicker ?
              < DateTimePicker
                testID="dateTimePicker"
                value={dataExtrato}
                mode={'date'}
                onChange={onChangeDate}
              /> : <></>
            }
            <FlatList
              data={extrato.movimentacoes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => renderItem(item)}
            />
            <InfoBar info={`Saldo: ${dadosUser.saldo} moedas`} color={Colors.verdeClaro} />
          </> : <ActivityIndicator size={40} color={Colors.verdeEscuro} />
      }
    </SafeAreaView>
  )
}