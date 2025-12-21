// app/_layout.tsx
import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { AuthProvider, useAuth } from "../AuthProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();

  useEffect(() => {
  const setupNotifications = async () => {
    const token = await registerForPushNotificationsAsync();
    console.log("Expo push token:", token);
  };

  setupNotifications();
}, []);


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" />
          <Stack.Screen name="Signup" />
          <Stack.Screen name="ForgotPassword" />
        </>
      ) : (
        <>
          <Stack.Screen name="index" />
          <Stack.Screen name="DescribePartner" />
        </>
      )}
    </Stack>
  );
}
