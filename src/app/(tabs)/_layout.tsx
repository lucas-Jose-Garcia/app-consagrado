import { Tabs } from "expo-router";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Cheer from "@/assets/cheer.svg";
import Rosary from "@/assets/rosary.svg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { borderWidth: 0 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rosary"
        options={{
          title: "Terço",
          tabBarIcon: ({ color }) => (
            <Rosary width={27} height={27} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="consecration"
        options={{
          title: "Consagração",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={27}
              name="crown-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="prayers"
        options={{
          title: "Orações",
          tabBarIcon: ({ color }) => (
            <Cheer width={27} height={27} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="liturgy"
        options={{
          title: "Liturgia",
          tabBarIcon: ({ color }) => (
            <Feather size={24} name="book" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
