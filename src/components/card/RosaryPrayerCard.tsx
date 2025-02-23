import { getPrayer } from "@/data/prayers";
import { View, Text } from "react-native";
import { Paragraph } from "../text/paragraph";
import { H2 } from "../text/headings";
import { Card } from "./Card";

interface PrayerProps {
  prayerId: string;
}

export function RosaryPrayerCard({ prayerId }: PrayerProps) {
  const prayer = getPrayer(prayerId);

  if (!prayer) {
    return <Text className="text-gray-900">Oração não encontrada</Text>;
  }

  return (
    <Card>
      <H2>{prayer.title}</H2>
      <View className="space-y-2">
        {prayer.content["pt-br"].text.map((line, index) => (
          <Paragraph key={index} text={line} />
        ))}
      </View>
    </Card>
  );
}
