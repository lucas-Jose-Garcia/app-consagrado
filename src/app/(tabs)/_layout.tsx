import { Tabs } from "expo-router";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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
          borderTopWidth: 0,
          minHeight: 74,
        },
        tabBarActiveTintColor: colors.primary["400"],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="church" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rosary"
        options={{
          title: "Terço",
          tabBarIcon: ({ color }) => (
            <Rosary width={28} height={28} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="consecration"
        options={{
          title: "Consagração",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
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
            <Cheer width={28} height={28} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="liturgy"
        options={{
          title: "Liturgia",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="book-outline"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
