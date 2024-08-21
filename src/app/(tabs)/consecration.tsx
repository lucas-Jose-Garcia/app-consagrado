import { Button, ButtonText } from "@/components/button";
import { PrayerCard } from "@/components/card/prayerCard";
import { Conteiner } from "@/components/conteineres/conteiner";
import { ProgressCard } from "@/components/progressCard";
import { H3 } from "@/components/text/headings";
import { DataConsecration } from "@/data/consecration";
import { ProgressProps, useProgress } from "@/hooks/progress";
import { colors } from "@/styles/colors";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function Consecration() {
  const progress = useProgress();
  const [info, setInfo] = useState<ProgressProps | null>(null);

  const getProgress = async () => {
    const data: ProgressProps = await progress.get();
    setInfo(data);
  };

  useFocusEffect(
    useCallback(() => {
      getProgress();
    }, [])
  );
  return (
    <Conteiner>
      <Conteiner.Header icone="crown-outline" title="Consagração" />
      <Conteiner.Box>
        <ProgressCard value={info?.day ?? 0} maxValue={33} />

        <ScrollView className="flex-1 w-full mt-3">
          {DataConsecration.map((item) => (
            <PrayerCard
              key={item.id}
              id={item.id}
              title={item.title}
              preview={item.description}
              uri={item.image}
              type="consecration"
            />
          ))}
          <Button>
            <ButtonText text="Precisa ajustar seu progresso?" className="text-gray-400" />
          </Button>
        </ScrollView>
        <Button text="Teste" onPress={async () => await progress.testes()} />
      </Conteiner.Box>
    </Conteiner>
  );
}
