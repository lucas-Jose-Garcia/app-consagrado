import "@/styles/global.css";

import { Stack } from "expo-router";
import { View } from "react-native";

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Vollkorn_400Regular_Italic } from "@expo-google-fonts/vollkorn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const insets = useSafeAreaInsets();

  let [fontsLoaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Vollkorn_400Regular_Italic,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-gray-950" style={{ paddingTop: insets.top }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="prayer" />
          <Stack.Screen name="rosary" />
          <Stack.Screen name="adjustment" />
        </Stack>
        <StatusBar style="light" />
      </View>
    </GestureHandlerRootView>
  );
}
