import { ActionButton } from "@/components/actionButton";
import { Back } from "@/components/back";
import { Button } from "@/components/button";
import { ExpandableCard } from "@/components/card/expandableCard";
import { Conteiner } from "@/components/conteineres/conteiner";
import { XStack, YStack } from "@/components/conteineres/stacks";
import { FeaturedImage } from "@/components/featuredImage";
import { H1, H2 } from "@/components/text/headings";
import { Paragraph } from "@/components/text/paragraph";
import { getDayofWeek } from "@/data/global";
import {
  InfoGroupProps,
  RosaryPrayersProps,
  getGroupInfo,
  getPrayersRosary,
} from "@/data/rosary";
import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { BottomSheet, BottomSheetNative } from "@/components/bottomSheet";
import { BottonSheetPrayer } from "@/components/bottomSheet/prayer";

export default function Prayer() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [current, setCurrent] = useState<RosaryPrayersProps | null>(null);
  const [rosary, setRosary] = useState<RosaryPrayersProps[] | null>(null);
  const [firstId, setFirstId] = useState("");
  const [lastId, setLastId] = useState("");
  const [finished, setFinished] = useState(false);

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

    if (
      (move > 0 && current.prayed < current.occurrences) ||
      (move < 0 && current.prayed > 1)
    ) {
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
      }
    }, [id])
  );

  return (
    <Conteiner>
      <XStack className="w-full items-center justify-between">
        <Back replace="(tabs)/rosary" />
        <TouchableOpacity activeOpacity={0.7}>
          <XStack className="items-center gap-3 mr-4">
            <Paragraph text="escute" className="uppercase font-bold" />
            <Feather name="headphones" size={24} color={colors.gray[300]} />
          </XStack>
        </TouchableOpacity>
      </XStack>
      {current && (
        <Conteiner.Box>
          {!finished ? (
            <>
              <FeaturedImage
                uri={current.image}
                legend={
                  current.type === "Mystery" ? current.description : undefined
                }
              />

              <YStack className="w-full mt-4 px-6">
                <H2>
                  {current.type === "Mystery"
                    ? `${current.order}º Mistério`
                    : current.description}
                </H2>
                <ExpandableCard
                  text={current.content["pt-br"].text.join("\n")}
                  numberOfLines={3}
                  onPress={openBottonSheet}
                />
              </YStack>

              <XStack className="flex-1 w-full justify-between items-center mt-6 px-12">
                <ActionButton
                  icon="caretleft"
                  onPress={() => hendleMove(-1)}
                  active={firstId !== current.id}
                />

                <XStack className="items-center gap-1">
                  <H1 className="text-4xl">{String(current.prayed)}</H1>
                  <Paragraph text="/" className="text-sm" />
                  <Paragraph
                    text={String(current.occurrences)}
                    className="text-sm"
                  />
                </XStack>
                <ActionButton icon="caretright" onPress={() => hendleMove(1)} />
              </XStack>
            </>
          ) : (
            <>
              {info && (
                <YStack className="w-full h-full">
                  <View
                    ref={finishedRef}
                    className="w-full items-center pb-3 bg-gray-950 rounded-md"
                  >
                    <FeaturedImage uri={info.image} className="h-96" />
                    <H2>{info.title}</H2>
                    <Paragraph text={`${dayWeek} - ${formattedDate}`} />
                  </View>

                  <YStack className="flex-1 justify-between">
                    <Button className="mt-4" onPress={shereFinished}>
                      <Button.Icon icon="sharealt" />
                      <Button.Text text="Compartilhar" className="uppercase" />
                    </Button>
                    <Button
                      className="mb-4"
                      onPress={() => router.replace("(tabs)/rosary")}
                    >
                      <Button.Text text="Voltar" className="uppercase" />
                    </Button>
                  </YStack>
                </YStack>
              )}
            </>
          )}
        </Conteiner.Box>
      )}
      {current && (
        <BottonSheetPrayer
          ref={BottomSheetRef}
          title={current.description}
          text={current.content["pt-br"].text.join("\n")}
          stage={`${String(current.prayed)}/${String(current.occurrences)}`}
          previousOnPress={() => hendleMove(-1)}
          nextOnPress={() => hendleMove(1)}
        />
      )}
    </Conteiner>
  );
}
