import { getPrayer } from "@/data/prayers";
import { View, Text } from "react-native";
import { Paragraph } from "../text/paragraph";
import { H2 } from "../text/headings";
import { Card } from "./Card";
import { XStack } from "../conteineres/stacks";
import { useState } from "react";
import { IconButton } from "../IconButton";
import { AnimatedRosaryDot } from "./AnimatedRosaryDot";

interface PrayerProps {
  prayerId: string;
  occurrences: number;
}

export function RosaryPrayerCard({ prayerId, occurrences = 0 }: PrayerProps) {
  const [currentOccurrences, setCurrentOccurrences] = useState(0);

  const prayer = getPrayer(prayerId);

  if (!prayer) {
    return <Text className="text-gray-900">Oração não encontrada</Text>;
  }

  const occurrencesArray = Array.from({ length: occurrences }, (_, index) => index + 1);

  return (
    <Card>
      <H2>{prayer.title}</H2>
      <View className="space-y-2">
        {prayer.content["pt-br"].text.map((line, index) => (
          <Paragraph key={index} text={line} />
        ))}
        {occurrences > 1 && (
          <>
            <Paragraph text={`(${occurrences} vezes)`} />
            <XStack className="justify-center items-center gap-1 pt-2">
              <IconButton
                EntypoIcon="minus"
                disabled={currentOccurrences == 0}
                onPress={() => setCurrentOccurrences((prev) => prev - 1)}
              />
              <XStack className="gap-1 flex-wrap justify-center ml-1 mr-1">
                {occurrencesArray.map((_, index) => (
                  <AnimatedRosaryDot key={index} active={index < currentOccurrences} />
                ))}
              </XStack>
              <IconButton
                EntypoIcon="plus"
                disabled={currentOccurrences >= occurrences}
                onPress={() => setCurrentOccurrences((prev) => prev + 1)}
              />
            </XStack>
          </>
        )}
      </View>
    </Card>
  );
}
