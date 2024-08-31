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

  const [email, setEmail] = useState<string | undefined>(dadosUser?.user.email);
  const [nome, setNome] = useState<string | undefined>(dadosUser?.user.name);
  const navigation = useNavigation();

  const statusBarHeight = Constants.statusBarHeight;

  function handleSalvarAlteracoes() {
    if (email && nome){
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
        paddingTop: statusBarHeight,
        paddingHorizontal: '5%',
        backgroundColor: Colors.verdeClaro,
        justifyContent: 'space-between'
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name={'menu'} size={30} color={Colors.verdeEscuro}></Icon>
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Raleway', fontSize: 24 }}>{dadosUser?.user.name}</Text>
          <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require(`@/assets/images/logo-verde-amarelo.png`)}></Image>
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
        <Text style={{ fontFamily: 'Renovate', fontSize: 20, color: Colors.verdeEscuro, paddingLeft: 5 }}>Edição de dados</Text>
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
            <TextInput
              placeholder='Email'
              style={{
                backgroundColor: Colors.backgroundDefault,
                height: 40,
                width: '80%',
                marginVertical: 10,
                borderRadius: 15,
                padding: 10,
                fontFamily: 'Raleway'
              }}
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
            ></TextInput>
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
        </View>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Image style={{ height: 120, width: 300 }} source={require('@/assets/images/logo-horizontal-verde-amarelo.png')} />
          <Image style={{ height: 80, width: 160 }} source={require('@/assets/images/selo-proex-40anos-1cor.png')} />
        </View>
      </View>
    </SafeAreaView>
  );
}