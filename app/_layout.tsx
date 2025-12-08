// app/_layout.tsx
import React from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme, View, ActivityIndicator } from "react-native";

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
