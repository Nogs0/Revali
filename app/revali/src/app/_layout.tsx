import { loadAsync, useFonts } from "expo-font";
import { router, Slot } from "expo-router";
import { useEffect, useState } from "react";
import { ApiProvider } from "../contexts/apiContext";
import { AppProvider } from "../contexts/appContext";
import { AuthProvider, useAuthContext } from "../contexts/authContext";
import FlashMessage from "react-native-flash-message";

export default function RootLayout() {

  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadAsync({
      'Raleway': require('@/assets/fonts/Raleway.ttf'),
      'Renovate': require('@/assets/fonts/Renovate.otf'),
    })
      .then(() => {
        setFontLoaded(true)
      })
  }, [])

  function InitialLayout() {
    const { signed } = useAuthContext();

    if (!fontLoaded) {
      return null;
    }
    
    useEffect(() => {
      if (signed)
        router.replace('/(protected)')
      else router.replace('/(auth)')
    }, [signed])

    return <Slot />
  }

  return (
    <AuthProvider>
      <AppProvider>
        <ApiProvider>
          <InitialLayout />
        </ApiProvider>
      </AppProvider>
      <FlashMessage statusBarHeight={60} position={'top'} />
    </AuthProvider>
  );
}
