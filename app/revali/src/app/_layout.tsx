import { Colors } from "@/constants/Colors";
import { router, Slot, Stack } from "expo-router";
import { ApiProvider } from "../contexts/apiContext";
import { AppProvider } from "../contexts/appContext";
import { AuthProvider, useAuthContext } from "../contexts/authContext";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Raleway': require('@/assets/fonts/Raleway.ttf'),
    'Renovate': require('@/assets/fonts/Renovate.otf'),
  });
  
  function InitialLayout() {

    const { signed } = useAuthContext();
    useEffect(() => {
      if (signed)
        router.replace('/(protected)')
      else router.replace('/(auth)')

    }, [signed])

    return <Slot/>
  }

  return (
    <AuthProvider>
      <AppProvider>
        <ApiProvider>
          <InitialLayout />
        </ApiProvider>
      </AppProvider>
    </AuthProvider>
  );
}
