import { useFonts } from "expo-font";
import { router, Slot } from "expo-router";
import { useEffect } from "react";
import { ApiProvider } from "../contexts/apiContext";
import { AppProvider } from "../contexts/appContext";
import { AuthProvider, useAuthContext } from "../contexts/authContext";

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
