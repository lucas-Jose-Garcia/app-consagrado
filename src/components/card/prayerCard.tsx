import { TouchableOpacity } from "react-native";
import { Card } from "./Card";
import { Avatar, AvatarImage } from "../avatar";
import { XStack, YStack } from "../conteineres/stacks";
import { H2 } from "../text/headings";
import { Paragraph } from "../text/paragraph";
import { Link } from "expo-router";

interface PrayerCardProps {
  id: string;
  uri: string;
  title: string;
  preview: string;
}

export function PrayerCard({ id, uri, title, preview }: PrayerCardProps) {
  return (
    <Link href={`/prayer/${id}`} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <Card>
          <XStack className="items-center gap-3">
            <Avatar className="w-16 h-16">
              <AvatarImage source={{ uri }} />
            </Avatar>
            <YStack className="flex-1">
              <H2>{title}</H2>
              <Paragraph className="text-sm" text={preview} numberOfLines={1} />
            </YStack>
          </XStack>
        </Card>
      </TouchableOpacity>
    </Link>
  );
}
