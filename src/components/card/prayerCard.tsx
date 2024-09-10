import { Easing, Text, TouchableOpacity, View } from "react-native";
import { Card } from "./Card";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { XStack, YStack } from "../conteineres/stacks";
import { H2 } from "../text/headings";
import { Paragraph } from "../text/paragraph";
import { router } from "expo-router";
import { ProgressBar, ProgressBarProps } from "../progressBar";

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
            <AvatarImage source={{ uri }} />
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
