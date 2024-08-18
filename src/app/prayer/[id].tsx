import { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Conteiner } from "@/components/conteineres/conteiner";
import { Paragraph } from "@/components/text/paragraph";
import { DataPrayersProps, InfoPrayersProps, getPrayer, getPrayers } from "@/data/prayers";
import { YStack } from "@/components/conteineres/stacks";
import { Conver, ConverProps } from "@/components/cover";
import { PrayerText } from "@/components/prayerText";
import { colors } from "@/styles/colors";
import { GroupMysteriesProps, ListRosary, currentRosary, getRosary } from "@/data/rosary";
import { Button } from "@/components/button";
import { DataConsecrationProps, getStageConsecration } from "@/data/consecration";
import { PrayerCard } from "@/components/card/prayerCard";
import { PrayersProps } from "@/data/global";
import { H3 } from "@/components/text/headings";

const Tab = createMaterialTopTabNavigator();

export default function Prayer() {
  const { id, type } = useLocalSearchParams<{
    id: string;
    type?: "simple" | "rosary" | "consecration";
  }>();
  const [player, setPlayer] = useState<DataPrayersProps | null>(null);
  const [rosary, setRosary] = useState<GroupMysteriesProps | null>(null);
  const [consecration, setConsecration] = useState<DataConsecrationProps | null>(null);
  const [infoConsecration, setInfoConsecration] = useState<PrayersProps[] | null>(null);
  const [cover, setCover] = useState<ConverProps | null>(null);
  const [youtubeId, setYoutubeId] = useState("");

  function totleYoutube(id: string) {
    setYoutubeId((prevState) => (prevState === id ? "" : id));
  }

  const PrayerTextPtBr = () => (
    <PrayerText
      content={player?.content["pt-br"]}
      setYoutube={() => totleYoutube(player?.content["pt-br"].media?.youtubeId ?? "")}
    />
  );

  const PrayerTextLa = () => (
    <PrayerText
      content={player?.content["la"]}
      setYoutube={() => totleYoutube(player?.content["la"]?.media?.youtubeId ?? "")}
    />
  );

  const thirdDay = currentRosary();

  useFocusEffect(
    useCallback(() => {
      if (id !== undefined && type === "simple") {
        const data = getPrayer(id);
        setPlayer(data);
        setCover({ image: data.image, title: data.title });
      }

      if (id !== undefined && type === "rosary") {
        const data = getRosary(id);
        setRosary(data);
        setCover({ image: data.image, title: data.title });
      }

      if (id !== undefined && type === "consecration") {
        const data = getStageConsecration(id);
        setConsecration(data);

        setCover({ image: data.image, title: data.title });

        const players = data.prayers.map((x) => x.prayerId);
        const info = getPrayers(players);
        setInfoConsecration(info);
      }
    }, [])
  );
  return (
    <Conteiner>
      {cover && <Conver image={cover.image} title={cover.title} youtubeId={youtubeId} />}

      {!rosary &&
        !infoConsecration &&
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
              {player && player.content.la && <Tab.Screen name="Latim" component={PrayerTextLa} />}
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <PrayerTextPtBr />
        ))}

      {!infoConsecration && rosary && (
        <Conteiner.Box>
          {rosary.description && <Paragraph text={rosary.description} className="w-full" />}

          <YStack className="w-full">
            <Paragraph text="Mistérios" className="justify-start font-bold mt-5" />
          </YStack>
          <ScrollView className="w-full mt-2" overScrollMode="never" showsHorizontalScrollIndicator={false}>
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

      {consecration && infoConsecration && (
        <Conteiner.Box>
          <ScrollView showsVerticalScrollIndicator={false} className="w-full flex-1">
            {infoConsecration && (
              <>
                <H3>Orações</H3>
                {infoConsecration.map((item) => (
                  <PrayerCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    preview={item.preview}
                    uri={item.uri}
                    type="simple"
                  />
                ))}
              </>
            )}
            {consecration.rosary && (
              <>
                <H3 className="mt-4">Rosário</H3>
                <Paragraph text="Resar um rosário ou ao menos um terço." />
                <PrayerCard
                  id={ListRosary[0].id}
                  title={ListRosary[0].title}
                  preview={ListRosary[0].preview}
                  uri={ListRosary[0].uri}
                  type="rosary"
                />
                <PrayerCard
                  id={thirdDay.id}
                  title={thirdDay.title}
                  preview={thirdDay.preview}
                  uri={thirdDay.uri}
                  type="rosary"
                />
              </>
            )}
          </ScrollView>
        </Conteiner.Box>
      )}
    </Conteiner>
  );
}
