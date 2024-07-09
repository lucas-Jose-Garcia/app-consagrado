import { TouchableOpacity } from "react-native";
import { Card } from "./Card";
import { Avatar, AvatarImage } from "../avatar";
import { XStack, YStack } from "../conteineres/stacks";
import { H2 } from "../text/headings";
import { Paragraph } from "../text/paragraph";

interface PrayerCardProps {
  uri: string;
  title: string;
  preview: string;
  onPress: () => void;
}

export function PrayerCard({ uri, title, preview, onPress }: PrayerCardProps) {
  return (
    <Card>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <XStack className="items-center gap-3">
          <Avatar className="w-16 h-16">
            <AvatarImage source={{ uri }} />
          </Avatar>
          <YStack className="flex-1">
            <H2>{title}</H2>
            <Paragraph className="text-sm" text={preview} numberOfLines={1} />
          </YStack>
        </XStack>
      </TouchableOpacity>
    </Card>
  );
}
