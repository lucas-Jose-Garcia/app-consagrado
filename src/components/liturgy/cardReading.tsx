import { ItemLiturgyProps } from "@/hooks/liturgy";
import { H2 } from "../text/headings";
import { Paragraph } from "../text/paragraph";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { YStack } from "../conteineres/stacks";
import { colors } from "@/styles/colors";

export type ReadingsOptions = "1ª Leitura" | "Salmo" | "2ª Leitura" | "Evangelho";

interface CardReadingProps {
  title: ReadingsOptions;
  data: ItemLiturgyProps | undefined;
}

export function CardReading({ title, data }: CardReadingProps) {
  const completion = title == "Evangelho" ? "- Palavra da Salvação." : "- Palavra do Senhor.";
  const finalAnwser = title == "Evangelho" ? "- Glória a vós, Senhor." : "- Graças a Deus.";

  return (
    <View className="flex-1 bg-gray-950 pt-4">
      {data ? (
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never" className="flex-1">
          <YStack className="flex-1 justify-center items-center mb-6 px-4">
            <H2>{title}</H2>
            <Paragraph text={data.referencia} />
            {data.titulo && <Paragraph className="pt-3 pb-2 text-lg" text={data.titulo} />}
            {data.refrao && (
              <>
                <Paragraph className="pt-3 pb-2 text-lg" text={data.refrao}>
                  <Paragraph className="text-lg font-bold" text={"R: "} />
                </Paragraph>
              </>
            )}
            <Paragraph className="text-lg" text={data.texto} />
            {title != "Salmo" && (
              <>
                <Paragraph className="pt-3 text-lg" text={completion} />
                <Paragraph className="pt-3 text-lg font-bold" text={finalAnwser} />
              </>
            )}
          </YStack>
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center">
          <ActivityIndicator color={colors.primary[400]} size={"large"} />
        </View>
      )}
    </View>
  );
}
