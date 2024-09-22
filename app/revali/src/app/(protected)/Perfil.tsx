import { Colors } from '@/constants/Colors';
import { useApiContext } from '@/src/contexts/apiContext';
import { useAppContext } from '@/src/contexts/appContext';
import Icon from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export default function index() {

  const { dadosUser, setDadosUser } = useAppContext();
  const { updateUser } = useApiContext();

  const [email, setEmail] = useState<string | undefined>(dadosUser?.user?.email);
  const [nome, setNome] = useState<string | undefined>(dadosUser?.user?.name);
  const navigation = useNavigation();

  const statusBarHeight = Constants.statusBarHeight;

  function handleSalvarAlteracoes() {
    if (email && nome) {
      setDadosUser(prev => {
        prev.user.email = email;
        prev.user.name = nome;

        return prev;
      })

      updateUser(email, nome)
        .then(() => {
          showMessage({
            message: 'Dados atualizados com sucesso!',
            type: 'success'
          })
        })
        .catch((e) => {
          showMessage({
            message: 'Falha ao atualizar os dados!',
            type: 'danger'
          })
        })
    }
  }

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: Colors.backgroundDefault }}>
      <View style={{
        height: '30%',
        paddingTop: statusBarHeight + 10,
        paddingHorizontal: '5%',
        backgroundColor: Colors.verdeClaro,
        justifyContent: 'space-between',
        borderBottomRightRadius: 30
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity style={{ width: 70, height: 25 }} onPress={() => navigation.openDrawer()}>
            <Icon name={'menu'} size={30} color={Colors.verdeEscuro}></Icon>
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Raleway', fontSize: 24 }}>{'Perfil'}</Text>
          <View>
            <Image style={{ width: 70, height: 25 }} source={require(`@/assets/images/logo-horizontal-verde-amarelo.png`)}></Image>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Icon name='logo-usd' size={30} color={Colors.verdeEscuro}></Icon>
          <Text style={{ fontFamily: 'Renovate', fontSize: 30, color: Colors.verdeEscuro, paddingLeft: 5 }}>{dadosUser?.saldo}</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: '2%'
        }}>
          <View style={{ width: '40%' }}>
            <Text style={{ fontFamily: 'Renovate', fontSize: 20, color: Colors.verdeEscuro, paddingLeft: 5 }}>Doações</Text>
            <View style={{ backgroundColor: Colors.verdeEscuro, borderRadius: 15, flexDirection: 'row', padding: 10 }}>
              <Icon name={'arrow-up-sharp'} color={Colors.amarelo} size={20}></Icon>
              <Text style={{ fontFamily: 'Raleway', fontSize: 16, color: Colors.backgroundDefault }}>{dadosUser?.quantidade_doacoes}</Text>
            </View>
          </View>
          <View style={{ width: '40%' }}>
            <Text style={{ fontFamily: 'Renovate', fontSize: 20, color: Colors.verdeEscuro, paddingLeft: 5 }}>Resgates</Text>
            <View style={{ backgroundColor: Colors.verdeEscuro, borderRadius: 15, flexDirection: 'row', padding: 10 }}>
              <Icon name={'arrow-down-sharp'} color={Colors.amarelo} size={20}></Icon>
              <Text style={{ fontFamily: 'Raleway', fontSize: 16, color: Colors.backgroundDefault }}>{dadosUser?.quantidade_resgates}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{
        padding: '5%',
      }}>
        {/* <Text style={{ fontFamily: 'Renovate', fontSize: 20, color: Colors.verdeEscuro, paddingLeft: 5 }}>Edição de dados</Text>
        <View style={{
          margin: '5%',
          backgroundColor: Colors.verdeClaro,
          borderRadius: 15,
          padding: '2%',
          height: '40%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Text style={{fontFamily: 'Renovate', fontSize: 20, color: Colors.verdeEscuro, paddingLeft: 5, textAlign: 'left', width: '80%'}} >Nome</Text>
            <TextInput
              placeholder='Nome'
              style={{
                backgroundColor: Colors.backgroundDefault,
                height: 40,
                width: '80%',
                marginVertical: 10,
                borderRadius: 15,
                padding: 10,
                fontFamily: 'Raleway'
              }}
              onChangeText={setNome}
              value={nome}
            ></TextInput>
          </View>
          <TouchableOpacity style={{
            backgroundColor: Colors.verdeEscuro,
            borderRadius: 15,
            width: '50%',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center'
          }} onPress={() => handleSalvarAlteracoes()}>
            <Text style={{ textAlign: 'center', fontFamily: 'Renovate', fontSize: 20, color: Colors.amarelo, paddingLeft: 5 }}>Salvar alterações</Text>
          </TouchableOpacity>
        </View> */}
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Image style={{ height: 120, width: 300 }} source={require('@/assets/images/logo-horizontal-verde-amarelo.png')} />
          <Image style={{ height: 50, width: 100 }} source={require('@/assets/images/selo-proex-40anos-preto.png')} />
        </View>
      </View>
    </SafeAreaView>
  );
}