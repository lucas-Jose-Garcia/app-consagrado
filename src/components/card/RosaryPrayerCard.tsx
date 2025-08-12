import { getPrayer } from "@/data/prayers";
import { View, Text } from "react-native";
import { Paragraph } from "../text/paragraph";
import { H2 } from "../text/headings";
import { Card } from "./Card";
import { XStack } from "../conteineres/stacks";
import { useState, useEffect } from "react";
import { IconButton } from "../IconButton";
import { colors } from "@/styles/colors";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";

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

  function AnimatedRosaryDot({ active }: { active: boolean }) {
    const animation = useSharedValue(active ? 1 : 0);

    useEffect(() => {
      animation.value = withTiming(active ? 1 : 0, { duration: 350 });
    }, [active]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(animation.value, [0, 1], [colors.gray[400], colors.secondary[500]]),
        transform: [
          {
            scale: withSpring(animation.value === 1 ? 1.15 : 1, { damping: 10 }),
          },
        ],
      };
    });

    return (
      <Animated.View
        style={[
          { height: 20, width: 20, borderRadius: 10, alignItems: "center", justifyContent: "center", margin: 4 },
          animatedStyle,
        ]}
      >
        <View style={{ height: 12, width: 12, backgroundColor: colors.gray[900], borderRadius: 6 }} />
      </Animated.View>
    );
  }

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
