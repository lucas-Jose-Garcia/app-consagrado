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
import Cheer from "@/assets/cheer.svg";
import { IndividualPrayer } from "@/components/individualPrayer";
import { RosaryDetails } from "@/components/rosaryDetails";
import { ConsecrationDetails } from "@/components/consecrationDetails";

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

  const isIndividualPrayer = !rosary && !infoConsecration && player;
  const isRosary = !infoConsecration && rosary && id;
  const isConsecration = consecration && infoConsecration;

  function totleYoutube(id: string) {
    setYoutubeId((prevState) => (prevState === id ? "" : id));
  }

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

      {isIndividualPrayer && <IndividualPrayer prayer={player} totleYoutube={totleYoutube} />}

      {isRosary && <RosaryDetails rosary={rosary} id={id} />}

      {isConsecration && <ConsecrationDetails consecration={consecration} infoConsecration={infoConsecration} />}
    </Conteiner>
  );
}
