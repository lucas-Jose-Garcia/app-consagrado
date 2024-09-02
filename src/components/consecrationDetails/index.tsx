import { ScrollView } from "react-native";
import { PrayerCard } from "../card/prayerCard";
import { Conteiner } from "../conteineres/conteiner";
import { H3 } from "../text/headings";
import { Paragraph } from "../text/paragraph";
import { Button } from "../button";
import Cheer from "@/assets/cheer.svg";
import { DataConsecrationProps } from "@/data/consecration";
import { PrayersProps } from "@/data/global";
import { ListRosary, currentRosary } from "@/data/rosary";
import { XStack, YStack } from "../conteineres/stacks";
import { ProgressProps, useProgress } from "@/hooks/progress";
import { useEffect, useState } from "react";
import { isSameDay } from "date-fns";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

interface ConsecrationDetailsProps {
  consecration: DataConsecrationProps;
  infoConsecration: PrayersProps[];
  current: boolean;
}

export function ConsecrationDetails({ consecration, infoConsecration, current }: ConsecrationDetailsProps) {
  const progress = useProgress();
  const thirdDay = currentRosary();
  const [info, setInfo] = useState<ProgressProps | null>(null);
  const isRegisteredToday = info?.lastRegister ? isSameDay(new Date(info.lastRegister), new Date()) : false;

  const handleIncrement = async () => {
    await progress.increment();
    getProgress();
  };

  const getProgress = async () => {
    const data: ProgressProps = await progress.get();
    setInfo(data);
  };

  useEffect(() => {
    getProgress();
  }, []);

  return (
    <Conteiner.Box>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        className="w-full flex-1"
        contentContainerClassName="pb-5"
      >
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
      <YStack className="items-center p-3">
        {current &&
          (!isRegisteredToday ? (
            <>
              <Button text="Amém" IconSvg={Cheer} onPress={handleIncrement} color="primary" className="mt-3 mb-2" />
              <H3 className="text-gray-400 text-center mb-2">
                {isRegisteredToday
                  ? "Parabéns, você finalizou o dia de hoje! \n Continue assim amanhã!"
                  : "Clique para concluir o dia"}
              </H3>
            </>
          ) : (
            <XStack className="gap-4 mt-3 mb-5">
              <AntDesign name="heart" size={32} color={colors.primary["400"]} />
              <H3 className="text-gray-400 text-center">
                {"Parabéns, você finalizou o dia de hoje!\nContinue assim amanhã!"}
              </H3>
            </XStack>
          ))}
      </YStack>
    </Conteiner.Box>
  );
}
