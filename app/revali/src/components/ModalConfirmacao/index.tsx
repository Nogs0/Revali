import { View, Text } from 'react-native'
import React from 'react'

interface ModalConfirmacaoProps {
    titulo: string,
    mensagem: string,
    onOk: any
}

export default function ModalConfirmacao(props: ModalConfirmacaoProps) {
  return (
    <View>
      <Text>ModalConfirmacao</Text>
    </View>
  )
}