import { Conteiner } from "@/components/conteineres/conteiner";
import { YStack } from "@/components/conteineres/stacks";
import { Item } from "@/components/item/item";
import { CardReading, ReadingsOptions } from "@/components/liturgy/cardReading";
import { H2 } from "@/components/text/headings";
import { Paragraph } from "@/components/text/paragraph";
import { ResponseLiturgyProps, useLiturgy } from "@/hooks/liturgy";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, FlatList, ScrollView } from "react-native";

const LEITURAS: ReadingsOptions[] = [
  "1ª Leitura",
  "Salmo",
  "2ª Leitura",
  "Evangelho",
];

export default function Liturgy() {
  const { getLiturgy } = useLiturgy();
  const [readings, setReadings] = useState<ReadingsOptions[]>([]);
  const [data, setData] = useState<ResponseLiturgyProps | null>(null);
  const [currentReading, setCurrentReading] = useState<string>(LEITURAS[0]);

  function handleSelectReading(reading: string) {
    setCurrentReading(reading);
  }

  async function updateLiturgy() {
    const { response, listReadings } = await getLiturgy();

    setData(response);
    setReadings(listReadings);
  }

  useFocusEffect(
    useCallback(() => {
      updateLiturgy();
    }, [])
  );

  return (
    <Conteiner>
      <Conteiner.Header icone="book-outline" title="Liturgia" />
      <Conteiner.Box>
        {/* <Button title="Testar" onPress={updateLiturgy} /> */}

        <FlatList
          data={readings}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Item
              onPress={() => handleSelectReading(item)}
              title={item}
              selected={currentReading === item}
            />
          )}
          className="max-h-16 h-16"
          contentContainerStyle={{
            gap: 12,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />

        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          {data && (
            <YStack className="pb-5">
              <CardReading
                title="1ª Leitura"
                data={data.primeiraLeitura}
                VisibleCardTitle={currentReading}
              />
              <CardReading
                title="Salmo"
                data={data.salmo}
                VisibleCardTitle={currentReading}
              />
              {typeof data.segundaLeitura !== "string" && (
                <CardReading
                  title="2ª Leitura"
                  data={data.segundaLeitura}
                  VisibleCardTitle={currentReading}
                />
              )}
              <CardReading
                title="Evangelho"
                data={data.evangelho}
                VisibleCardTitle={currentReading}
              />
            </YStack>
          )}
        </ScrollView>

        {/* <FlatList
          className="flex-1"
          data={data}
          keyExtractor={(item) => item.description}
          renderItem={({ item }) => (
            <YStack className="p-4 rounded-md bg-gray-900">
              <H2>{item.description}</H2>
              <Paragraph
                className="text-lg"
                style={{ fontSize: 16, lineHeight: 26 }}
                key={item.description}
                text={item.text}
              />
            </YStack>
          )}
          contentContainerClassName="gap-6 py-6"
        /> */}

        {/* {data[0] && data[0].text && (
          <YStack className="p-4 gap-3 rounded-md bg-gray-900">
            {data[0].text.map((line, i) => (
              <Paragraph key={line + i} text={line} />
            ))}
          </YStack>
        )} */}
      </Conteiner.Box>
    </Conteiner>
  );
}
