import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import { Colors } from '@/constants/Colors'

interface ModalConfirmacaoProps {
  titulo: string,
  mensagem: string,
  onOk: any
  onCancel: any,
  visible: boolean
}

export default function ModalConfirmacao(props: ModalConfirmacaoProps) {
  return (
    <Modal animationType='fade'
      transparent={true}
      visible={props.visible}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.greyBackgroundModal }}>
        <View style={style.container}>
          <View style={style.titleContainer}>
            <Text style={{ fontSize: 30, fontFamily: 'Renovate', color: Colors.verdeEscuro }}>{props.titulo}</Text>
          </View>
          <View style={style.contentContainer}>
            <Text style={{ fontSize: 25, width: '80%', textAlign: 'justify', fontFamily: 'Raleway' }}>{props.mensagem}</Text>
          </View>
          <View style={style.buttonsContainer}>
            <TouchableOpacity style={[style.button, { borderRightWidth: 0.5 }]} onPress={() => props.onCancel()}>
              <Text style={{ fontSize: 20, fontFamily: 'Renovate', color: Colors.verdeClaro }}>Não</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[style.button, { borderLeftWidth: 0.5 }]} onPress={() => props.onOk()}>
              <Text style={{ fontSize: 20, fontFamily: 'Renovate', color: Colors.verdeEscuro }}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}