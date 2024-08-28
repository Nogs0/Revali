import { Colors } from '@/constants/Colors';
import { Redirect } from 'expo-router';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

export default function index() {
  return (
    <SafeAreaView style={{height: '100%', backgroundColor: Colors.backgroundDefault}}>
      <View></View>
      <View></View>
      <View></View>
    </SafeAreaView>
  );
}