import { Easing, Text, TouchableOpacity, View } from "react-native";
import { Card } from "./Card";
import { Avatar, AvatarImage } from "../avatar";
import { XStack, YStack } from "../conteineres/stacks";
import { H2 } from "../text/headings";
import { Paragraph } from "../text/paragraph";
import { router } from "expo-router";
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import { ProgressBar, ProgressBarProps } from "../progressBar";
interface PrayerCardProps {
  id: string;
  uri: string;
  title: string;
  preview: string;
  type: "simple" | "rosary" | "consecration";
  progressBar?: Omit<ProgressBarProps, "suffix">;
}

export function PrayerCard({ id, uri, title, preview, type, progressBar }: PrayerCardProps) {
  const onPress = () => router.push(`/prayer/${id}?type=${type}`);
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Card>
        <XStack className="items-center gap-3">
          <Avatar className="w-16 h-16">
            <AvatarImage source={{ uri }} />
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
