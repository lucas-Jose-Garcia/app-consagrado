import "@/styles/global.css";

import { Slot } from "expo-router";
import { View } from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Vollkorn_400Regular_Italic } from "@expo-google-fonts/vollkorn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const insets = useSafeAreaInsets();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Vollkorn_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }
  // style={{ paddingTop: insets.top }}
  return (
    <View className="flex-1 bg-gray-950" style={{ paddingTop: insets.top }}>
      <Slot />
      <StatusBar style="light" />
    </View>
  );
}
