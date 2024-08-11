import { View, Text } from 'react-native'
import React from 'react'
import { AppProvider } from './contexts/appContext'
import RootLayout from './app/_layout';

export default function App() {
  return (
    <AppProvider>
      <RootLayout/>
    </AppProvider>
  )
}