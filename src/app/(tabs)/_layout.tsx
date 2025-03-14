import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Cheer from "@/assets/cheer.svg";
import Rosary from "@/assets/rosary.svg";
import { colors } from "@/styles/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.gray["900"],
          borderTopWidth: 1,
          borderColor: colors.gray["950"],
          minHeight: 74,
        },
        tabBarActiveTintColor: colors.primary["400"],
        tabBarInactiveTintColor: colors.gray["300"],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Consagração",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="crown-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="rosary"
        options={{
          title: "Terço",
          tabBarIcon: ({ color }) => <Rosary width={28} height={28} fill={color} />,
        }}
      />

      <Tabs.Screen
        name="prayers"
        options={{
          title: "Orações",
          tabBarIcon: ({ color }) => <Cheer width={28} height={28} fill={color} />,
        }}
      />
    </Tabs>
  );
}
