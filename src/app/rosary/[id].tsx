import { ActionButton } from "@/components/actionButton";
import { Back } from "@/components/back";
import { Button, ButtonIcon, ButtonText } from "@/components/button";
import { ExpandableCard } from "@/components/card/expandableCard";
import { Conteiner } from "@/components/conteineres/conteiner";
import { XStack, YStack } from "@/components/conteineres/stacks";
import { FeaturedImage } from "@/components/featuredImage";
import { H1, H2 } from "@/components/text/headings";
import { Paragraph } from "@/components/text/paragraph";
import { getDayofWeek } from "@/data/global";
import {
  GroupMysteriesProps,
  InfoGroupProps,
  RosaryPrayersProps,
  getGroupInfo,
  getPrayersRosary,
  getRosary,
} from "@/data/rosary";
import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { BottomSheetNative } from "@/components/bottomSheet";
import { BottonSheetPrayer } from "@/components/bottomSheet/prayer";
import { Conver } from "@/components/cover";
import { Card } from "@/components/card/Card";

export default function Prayer() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [current, setCurrent] = useState<RosaryPrayersProps | null>(null);
  const [rosary, setRosary] = useState<RosaryPrayersProps[] | null>(null);
  const [groupMysteries, setGroupMysteries] = useState<GroupMysteriesProps | null>(null);
  const [firstId, setFirstId] = useState("");
  const [lastId, setLastId] = useState("");
  const [finished, setFinished] = useState(false);
  const [youtubeId, setYoutubeId] = useState("");

  const [info, setInfo] = useState<InfoGroupProps | null>();

  const finishedRef = useRef<View>(null);
  const BottomSheetRef = useRef<BottomSheetNative>(null);

  const formattedDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  });

  const dayWeek = getDayofWeek(new Date());

  function openBottonSheet() {
    BottomSheetRef.current?.expand();
  }

  function hendleMove(move: number) {
    if (!current || !rosary) return;

    if ((move > 0 && current.prayed < current.occurrences) || (move < 0 && current.prayed > 1)) {
      setCurrent((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          prayed: prevState.prayed + move,
        };
      });
    } else {
      const index = rosary.findIndex((x) => x.id === current.id) ?? 0;
      if (lastId !== current.id) {
        setCurrent(() => {
          const result = rosary[index + move];
          result.prayed = move < 0 ? result.occurrences : 1;
          return result;
        });
      } else {
        setFinished(true);
        //TODO: Implementar a parte visual quando finished for true
      }
    }
  }

  async function shereFinished() {
    try {
      const uri = await captureRef(finishedRef, {
        format: "png",
        quality: 1,
      });

      await Sharing.shareAsync(uri);
    } catch {
      Alert.alert("Compartilhar", "Não foi possível compartilhar essa imagem.");
    }
  }

  function handleWatchingVideo(id: string) {
    setYoutubeId((prevState) => (prevState === id ? "" : id));
  }

  useFocusEffect(
    useCallback(() => {
      if (id !== undefined) {
        const data = getPrayersRosary(id);
        setRosary(data);
        setCurrent(data[0]);
        setFirstId(data[0].id);
        setLastId(data[data.length - 1].id);

        const dataInfo = getGroupInfo(id);
        setInfo(dataInfo);

        const groupRosary = getRosary(id);
        setGroupMysteries(groupRosary);
      }
    }, [id])
  );

  return (
    <Conteiner>
      <XStack className="w-full items-center justify-between">
        <Back replace="(tabs)/rosary" />
        {youtubeId == "" ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleWatchingVideo(info?.youtubeId ?? "")}>
            <XStack className="items-center gap-3 mr-4">
              <Paragraph text="assistir" className="uppercase font-bold" />
              <Feather name="youtube" size={24} color={colors.gray[300]} />
            </XStack>
          </TouchableOpacity>
        ) : (
          <H2 className="w-5/6" numberOfLines={1}>
            {info?.title}
          </H2>
        )}
      </XStack>
      {current &&
        (youtubeId == "" ? (
          <Conteiner.Box>
            {!finished ? (
              <>
                <FeaturedImage
                  uri={current.image}
                  legend={current.type === "Mystery" ? current.description : undefined}
                />

                <YStack className="w-full mt-4 px-6">
                  <H2>{current.type === "Mystery" ? `${current.order}º Mistério` : current.description}</H2>
                  <ExpandableCard
                    text={current.content["pt-br"].text.join("\n")}
                    numberOfLines={3}
                    onPress={openBottonSheet}
                  />
                </YStack>

                <XStack className="flex-1 w-full justify-between items-center mt-6 px-12">
                  <ActionButton icon="caretleft" onPress={() => hendleMove(-1)} active={firstId !== current.id} />

                  <XStack className="items-center gap-1">
                    <H1 className="text-4xl">{String(current.prayed)}</H1>
                    <Paragraph text="/" className="text-sm" />
                    <Paragraph text={String(current.occurrences)} className="text-sm" />
                  </XStack>
                  <ActionButton icon="caretright" onPress={() => hendleMove(1)} />
                </XStack>
              </>
            ) : (
              <>
                {info && (
                  <YStack className="w-full h-full">
                    <View ref={finishedRef} className="w-full items-center pb-3 bg-gray-950 rounded-md">
                      <FeaturedImage uri={info.image} className="h-96" />
                      <H2>{info.title}</H2>
                      <Paragraph text={`${dayWeek} - ${formattedDate}`} />
                    </View>

                    <YStack className="flex-1 justify-between">
                      <Button className="mt-4" onPress={shereFinished}>
                        <ButtonIcon icon="sharealt" />
                        <ButtonText text="Compartilhar" className="uppercase" />
                      </Button>
                      <Button className="mb-4" onPress={() => router.replace("(tabs)/rosary")}>
                        <ButtonText text="Voltar" className="uppercase" />
                      </Button>
                    </YStack>
                  </YStack>
                )}
              </>
            )}
          </Conteiner.Box>
        ) : (
          <Conteiner.Box>
            <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never" className="w-full">
              <Conver image={current.image} title={current.title} youtubeId={youtubeId} showHeader={false} />
              {groupMysteries && (
                <YStack>
                  <H2>{groupMysteries.title}</H2>
                  {groupMysteries.mysteries.map((x) => (
                    <Card key={`${x.order}º Misterio - ${x.title}`}>
                      <Paragraph text={`${x.order}º Misterio - ${x.title}`} className="mt-1" />
                      <Paragraph text={x.offering} className="mt-1" />
                    </Card>
                  ))}
                </YStack>
              )}
            </ScrollView>
          </Conteiner.Box>
        ))}
      {current && (
        <BottonSheetPrayer
          ref={BottomSheetRef}
          title={current.description}
          text={current.content["pt-br"].text.join("\n")}
          stage={`${String(current.prayed)}/${String(current.occurrences)}`}
          previous={{
            active: firstId !== current.id,
            onPress: () => hendleMove(-1),
          }}
          next={{
            active: lastId !== current.id,
            onPress: () => hendleMove(1),
          }}
        />
      )}
    </Conteiner>
  );
}
