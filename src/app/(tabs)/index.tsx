import { BottomSheetNative } from "@/components/bottomSheet";
import { BottonSheetAdjust } from "@/components/bottomSheet/adjust";
import { Button, ButtonText } from "@/components/button";
import { PrayerCard } from "@/components/card/prayerCard";
import { Conteiner } from "@/components/conteineres/conteiner";
import { ProgressCard } from "@/components/progressCard";
import { DataConsecration, DataConsecrationProps } from "@/data/consecration";
import { ProgressProps, useProgress } from "@/hooks/progress";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ScrollView } from "react-native";

interface DataProps extends DataConsecrationProps {
  value?: number;
  current?: boolean;
}

export default function Consecration() {
  const progress = useProgress();
  const BottomSheetRef = useRef<BottomSheetNative>(null);
  const [info, setInfo] = useState<ProgressProps | null>(null);
  const [data, setData] = useState<DataProps[] | null>(null);

  const getProgress = async () => {
    const data: ProgressProps = await progress.get();
    setInfo(data);
    defineProgress(data);
  };

  const onClose = () => {
    getProgress();
    BottomSheetRef.current?.close();
  };

  function openBottonSheet() {
    BottomSheetRef.current?.expand();
  }

  function defineProgress(information: ProgressProps) {
    const newData: DataProps[] = [...DataConsecration];
    const newInfo = information;
    let restDays = newInfo?.day ?? 0;
    let finish = false;

    newData.forEach((item) => {
      restDays -= item.days;
      let progress = 0;
      item.current = false;

      if (restDays < 0 && !finish) {
        progress = item.days + restDays;
        item.current = true;
        finish = true;
      } else if (restDays >= 0) {
        progress = item.days;
      }

      item.value = progress;
    });

    setData(newData);
  }

  useFocusEffect(
    useCallback(() => {
      getProgress();
    }, [])
  );
  return (
    <Conteiner>
      <Conteiner.Header icone="crown-outline" title="Consagração" />
      <Conteiner.Box>
        <ScrollView className="flex-1 w-full mt-3" showsVerticalScrollIndicator={false}>
          <ProgressCard value={info?.day ?? 0} maxValue={33} />
          {data &&
            data.map((item) => (
              <PrayerCard
                key={item.id}
                id={item.id}
                title={item.title}
                preview={item.description}
                uri={item.image}
                progressBar={{
                  value: item.value ?? 0,
                  max: item.days,
                }}
                current={item.current}
                type="consecration"
              />
            ))}
          <Button onPress={openBottonSheet}>
            <ButtonText text="Precisa ajustar seu progresso?" className="text-gray-400" />
          </Button>
        </ScrollView>
        {/* <Button text="Teste" onPress={async () => await progress.testes()} /> */}
      </Conteiner.Box>
      <BottonSheetAdjust ref={BottomSheetRef} limit={33} onClose={onClose} />
    </Conteiner>
  );
}
