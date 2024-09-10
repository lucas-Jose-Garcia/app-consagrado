import { TabBar, TabBarItemProps } from "@/components/TabBar";
import { Conteiner } from "@/components/conteineres/conteiner";
import { XStack } from "@/components/conteineres/stacks";
import { CardReading } from "@/components/liturgy/cardReading";
import { H3 } from "@/components/text/headings";
import { useLiturgy } from "@/hooks/liturgy";
import { format } from "date-fns";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

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

  async function updateLiturgy() {
    const { sectionReading } = await getLiturgy();

    setInfo(
      sectionReading.map((x) => {
        return {
          key: x.title,
          renderItem: x.data && <CardReading title={x.title} data={x.data} />,
        };
      })
    );
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
      <TabBar itens={info} enableScroll={info.length === 4} />
    </Conteiner>
  );
}
