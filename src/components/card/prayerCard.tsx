import { ImageSourcePropType, TouchableOpacity } from "react-native";
import { Card } from "./Card";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { XStack, YStack } from "../conteineres/stacks";
import { H2 } from "../text/headings";
import { Paragraph } from "../text/paragraph";
import { router } from "expo-router";
import { ProgressBar, ProgressBarProps } from "../progressBar";
import { useState } from "react";

interface PrayerCardProps {
  id: string;
  uri: string;
  title: string;
  preview: string;
  type: "simple" | "rosary" | "consecration";
  progressBar?: Omit<ProgressBarProps, "suffix">;
  current?: boolean;
}

export function PrayerCard({ id, uri, title, preview, type, progressBar, current = true }: PrayerCardProps) {
  const [currentSourse, setCurrentSource] = useState<ImageSourcePropType | undefined>({ uri });

  const handleError = () => {
    setCurrentSource(require("@/assets/avatar-fallback.png"));
  };

  const currentLabel = current ? "ativo" : "inativo";
  const onPress = () =>
    router.push({
      pathname: "/prayer/[id]",
      params: { id, type, current: currentLabel },
    });
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Card>
        <XStack className="items-center gap-3">
          <Avatar className="w-16 h-16">
            <AvatarImage source={currentSourse} onError={handleError} />
            <AvatarFallback>{title[0]}</AvatarFallback>
          </Avatar>
          <YStack className="flex-1">
            <H2>{title}</H2>
            <Paragraph className="text-sm" text={preview} numberOfLines={1} />

            {progressBar && <ProgressBar value={progressBar.value} max={progressBar.max} suffix="dias" />}
          </YStack>
        </XStack>
      </Card>
    </TouchableOpacity>
  );
}
