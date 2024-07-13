import { useState } from "react";
import { ScrollView } from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Conteiner } from "@/components/conteineres/conteiner";
import { Paragraph } from "@/components/text/paragraph";
import { DataPrayersProps, getPrayer } from "@/data/prayers";
import { YStack } from "@/components/conteineres/stacks";
import { Conver } from "@/components/cover";
import { PrayerText } from "@/components/prayerText";
import { colors } from "@/styles/colors";

const Tab = createMaterialTopTabNavigator();

export default function Prayer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [player, setPlayer] = useState<DataPrayersProps | null>(null);
  const [youtubeId, setYoutubeId] = useState("");

  function totleYoutube(id: string) {
    setYoutubeId((prevState) => (prevState === id ? "" : id));
  }

  const PrayerTextPtBr = () => (
    <PrayerText
      content={player?.content["pt-br"]}
      setYoutube={() =>
        totleYoutube(player?.content["pt-br"].media?.youtubeId ?? "")
      }
    />
  );

  const PrayerTextLa = () => (
    <PrayerText
      content={player?.content["la"]}
      setYoutube={() =>
        totleYoutube(player?.content["la"]?.media?.youtubeId ?? "")
      }
    />
  );

  useFocusEffect(() => {
    if (id !== undefined) {
      const data = getPrayer(id);
      setPlayer(data);
    }
  });
  return (
    <Conteiner>
      {player?.id && player.title && (
        <Conver
          image={player.image}
          title={player.title}
          youtubeId={youtubeId}
        />
      )}

      {player && player.content.la ? (
        <NavigationContainer independent>
          <Tab.Navigator
            screenOptions={{
              tabBarIndicatorContainerStyle: {
                backgroundColor: colors.gray["900"],
              },
              tabBarActiveTintColor: colors.primary["400"],
              tabBarInactiveTintColor: colors.gray["200"],
              tabBarIndicatorStyle: {
                backgroundColor: colors.primary["400"],
              },
            }}
          >
            <Tab.Screen name="Português" component={PrayerTextPtBr} />
            {player && player.content.la && (
              <Tab.Screen name="Latim" component={PrayerTextLa} />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <PrayerTextPtBr />
      )}
    </Conteiner>
  );
}
