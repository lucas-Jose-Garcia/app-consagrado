import { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Conteiner } from "@/components/conteineres/conteiner";
import { Paragraph } from "@/components/text/paragraph";
import { DataPrayersProps, getPrayer } from "@/data/prayers";
import { YStack } from "@/components/conteineres/stacks";
import { Conver } from "@/components/cover";
import { PrayerText } from "@/components/prayerText";
import { colors } from "@/styles/colors";
import { GroupMysteriesProps, getRosary } from "@/data/rosary";
import { Button } from "@/components/button";

const Tab = createMaterialTopTabNavigator();

export default function Prayer() {
  const { id, type } = useLocalSearchParams<{
    id: string;
    type?: "simple" | "rosary";
  }>();
  const [player, setPlayer] = useState<DataPrayersProps | null>(null);
  const [rosary, setRosary] = useState<GroupMysteriesProps | null>(null);
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

  useFocusEffect(
    useCallback(() => {
      if (id !== undefined && type === "simple") {
        const data = getPrayer(id);
        setPlayer(data);
      }

      if (id !== undefined && type === "rosary") {
        const data = getRosary(id);
        setRosary(data);
      }
    }, [])
  );
  return (
    <Conteiner>
      {player?.id && player.title && (
        <Conver
          image={player.image}
          title={player.title}
          youtubeId={youtubeId}
        />
      )}

      {rosary?.id && rosary.title && (
        <Conver
          image={rosary.image}
          title={rosary.title}
          youtubeId={youtubeId}
        />
      )}

      {!rosary &&
        (player && player.content.la ? (
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
        ))}

      {rosary && (
        <Conteiner.Box>
          {rosary.description && (
            <Paragraph text={rosary.description} className="w-full" />
          )}

          <YStack className="w-full">
            <Paragraph
              text="Mistérios"
              className="justify-start font-bold mt-5"
            />
          </YStack>
          <ScrollView
            className="w-full mt-2"
            overScrollMode="never"
            showsHorizontalScrollIndicator={false}
          >
            {rosary.mysteries.map((x) => (
              <Paragraph
                key={`${x.order}º Misterio - ${x.title}`}
                text={`${x.order}º Misterio - ${x.title}`}
                className="mt-1"
              />
            ))}
          </ScrollView>
          <Button
            text="Iniciar"
            icon="caretright"
            onPress={() => router.push(`/rosary/${id}`)}
            color="green"
            className="mt-3 mb-10"
          />
        </Conteiner.Box>
      )}
    </Conteiner>
  );
}
