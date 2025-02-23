import { getPrayer } from "@/data/prayers";
import { View, Text, TouchableOpacity } from "react-native";
import { Paragraph } from "../text/paragraph";
import { H2 } from "../text/headings";
import { Card } from "./Card";
import { XStack } from "../conteineres/stacks";
import { useState } from "react";
import { Button, ButtonIcon } from "../button";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { IconButton } from "../IconButton";
import { cn } from "@/lib/utils";

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
            <XStack className="justify-center items-center gap-4 pt-2">
              <IconButton
                EntypoIcon="minus"
                disabled={currentOccurrences == 0}
                onPress={() => setCurrentOccurrences((prev) => prev - 1)}
              />
              <XStack className="gap-2">
                {occurrencesArray.map((_, index) => (
                  <View
                    key={index}
                    className={cn(
                      "h-5 w-5  rounded-full items-center justify-center",
                      index < currentOccurrences ? "bg-sky-500" : "bg-gray-400"
                    )}
                  >
                    <View className="h-3 w-3 bg-gray-900 rounded-full" />
                  </View>
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
