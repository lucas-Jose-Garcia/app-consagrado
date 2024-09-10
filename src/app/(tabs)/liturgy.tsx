import { TabBar, TabBarItemProps } from "@/components/TabBar";
import { Button } from "@/components/button";
import { Conteiner } from "@/components/conteineres/conteiner";
import { XStack } from "@/components/conteineres/stacks";
import { CardReading } from "@/components/liturgy/cardReading";
import { H1, H3 } from "@/components/text/headings";
import { Paragraph } from "@/components/text/paragraph";
import { useLiturgy } from "@/hooks/liturgy";
import { format } from "date-fns";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function Liturgy() {
  const { getLiturgy } = useLiturgy();
  const [info, setInfo] = useState<TabBarItemProps[]>([
    {
      key: "1ª Leitura",
      renderItem: null,
    },
    {
      key: "Salmo",
      renderItem: null,
    },
    {
      key: "2ª Leitura",
      renderItem: null,
    },
    {
      key: "Evangelho",
      renderItem: null,
    },
  ]);
  const [isErrorLoading, setIsErrorLoading] = useState(false);

  async function updateLiturgy() {
    setIsErrorLoading(false);

    const { sectionReading, isError } = await getLiturgy();

    if (sectionReading && !isError) {
      setInfo(
        sectionReading.map((x) => {
          return {
            key: x.title,
            renderItem: x.data && <CardReading title={x.title} data={x.data} />,
          };
        })
      );
    }

    if (isError) {
      setIsErrorLoading(true);
    }
  }

  useFocusEffect(
    useCallback(() => {
      updateLiturgy();
    }, [])
  );

  const formattedDate = format(new Date(), "dd.MM.yyyy");

  return (
    <Conteiner>
      <Conteiner.Header icone="book-outline" title="Liturgia" />
      <XStack className="w-100 justify-center pb-3 -mt-3">
        <H3 className="text-gray-400">{formattedDate}</H3>
      </XStack>
      <TabBar
        itens={info}
        enableScroll={info.length === 4}
        error={{
          isError: isErrorLoading,
          renderError: (
            <View className="flex-1 justify-center items-center px-8">
              <H1>Opps!</H1>
              <H3 className="text-center">Sentimos muito, não foi possível carregar o evangelho diário!</H3>
              <Button text="Recarregar" color="primary" className="mt-3" onPress={updateLiturgy} />
            </View>
          ),
        }}
      />
    </Conteiner>
  );
}
