import { Button, ButtonIcon } from "@/components/button";
import { Conteiner } from "@/components/conteineres/conteiner";
import { XStack } from "@/components/conteineres/stacks";
import { InlineHeader } from "@/components/header/inlineHeader";
import { H1, H2 } from "@/components/text/headings";
import { Paragraph } from "@/components/text/paragraph";
import { useProgress } from "@/hooks/progress";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export default function Adjust() {
  const progress = useProgress();
  const [currentDay, setCurrentDay] = useState(0);

  const fetchDay = async () => {
    const data = await progress.get();
    setCurrentDay(data.day);
  };

  const increment = () => setCurrentDay((prevDay) => (prevDay < 33 ? prevDay + 1 : 33));
  const decrement = () => setCurrentDay((prevDay) => (prevDay > 0 ? prevDay - 1 : 0));

  const save = async () => {
    await progress.set(currentDay);
    router.replace({ pathname: "/(tabs)/" });
  };

  const reset = async () => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir seu progresso?", [
      {
        text: "Não",
      },
      {
        text: "Sim",
        onPress: async () => {
          await progress.set(0);
          router.replace({ pathname: "/(tabs)/" });
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      fetchDay();
    }, [])
  );
  return (
    <Conteiner>
      <InlineHeader title="Ajustar Progresso" />
      <Conteiner.Box>
        <XStack className="w-full justify-center">
          <XStack className="items-center gap-8 mt-6">
            <Button size="content" onPress={decrement}>
              <ButtonIcon icon="minus" />
            </Button>
            <H1>{currentDay}</H1>
            <Button size="content" onPress={increment}>
              <ButtonIcon icon="plus" />
            </Button>
          </XStack>
        </XStack>
        <Button text="Salvar" color="primary" className="mt-6" onPress={save} />
        <Button text="Iniciar do zero" className="my-6" onPress={reset} />
      </Conteiner.Box>
    </Conteiner>
  );
}
