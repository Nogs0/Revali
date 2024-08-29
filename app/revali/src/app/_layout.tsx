import { useFonts } from "expo-font";
import { router, Slot } from "expo-router";
import { useEffect } from "react";
import { ApiProvider } from "../contexts/apiContext";
import { AppProvider } from "../contexts/appContext";
import { AuthProvider, useAuthContext } from "../contexts/authContext";
import FlashMessage from "react-native-flash-message";

export default function RootLayout() {
  
  function InitialLayout() {

    const [loaded, error] = useFonts({
      'Raleway': require('@/assets/fonts/Raleway.ttf'),
      'Renovate': require('@/assets/fonts/Renovate.otf'),
    });
    const { signed } = useAuthContext();
    useEffect(() => {
      if (loaded){
        if (signed)
          router.replace('/(protected)')
        else router.replace('/(auth)')
      }
    }, [signed, loaded])

    return <Slot/>
  }

  return (
    <AuthProvider>
      <AppProvider>
        <ApiProvider>
          <InitialLayout />
        </ApiProvider>
      </AppProvider>
      <FlashMessage statusBarHeight={20} position={'top'}/>
    </AuthProvider>
  );
}
