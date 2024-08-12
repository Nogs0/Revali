import { Stack } from "expo-router";
import { AppProvider } from "../contexts/appContext";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false, statusBarColor: Colors.lime300 }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AppProvider>
  );
}
