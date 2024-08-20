import { ScrollView } from "react-native";
import { Conteiner } from "../conteineres/conteiner";
import { GroupMysteriesProps } from "@/data/rosary";
import { Paragraph } from "../text/paragraph";
import { YStack } from "../conteineres/stacks";
import { Button } from "../button";
import { router } from "expo-router";

interface RosaryDetailsProps {
  rosary: GroupMysteriesProps;
  id: string;
}

export function RosaryDetails({ rosary, id }: RosaryDetailsProps) {
  return (
    <Conteiner.Box>
      <ScrollView className="w-full mt-2" overScrollMode="never" showsHorizontalScrollIndicator={false}>
        {rosary.description && <Paragraph text={rosary.description} className="w-full" />}

        <YStack className="w-full">
          <Paragraph text="Mistérios" className="justify-start font-bold mt-5" />
        </YStack>
        {rosary.mysteries.map((x) => (
          <Paragraph
            key={`${x.order}º Misterio - ${x.title}`}
            text={`${x.order}º Misterio - ${x.title}`}
            className="mt-1"
          />
        ))}
      </ScrollView>
      <Button
        text="Passo a Passo"
        icon="caretright"
        onPress={() => router.push(`/rosary/${id}`)}
        color="primary"
        className="mt-3 mb-10"
      />
    </Conteiner.Box>
  );
}
