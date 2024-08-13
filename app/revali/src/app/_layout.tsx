import { Stack } from "expo-router";
import { AppProvider } from "../contexts/appContext";
import { Colors } from "@/constants/Colors";
import { ApiProvider } from "../contexts/apiContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <ApiProvider>
        <Stack screenOptions={{ headerShown: false, statusBarColor: Colors.lime300 }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ApiProvider>
    </AppProvider>
  );
}
