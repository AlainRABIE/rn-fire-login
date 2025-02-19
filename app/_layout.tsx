import AuthProvider from "@/context/ctx";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack >
        <Stack.Screen name="auth" options={{headerShown:false}} />
        <Stack.Screen name="app" options={{headerShown:false}} />
        <Stack.Screen name="+not-found" options={{headerShown:false}} />
        </Stack>
    </AuthProvider>
  );
}
