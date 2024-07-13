import { ScrollView } from "react-native";
import { XStack, YStack } from "../conteineres/stacks";
import { Paragraph } from "../text/paragraph";
import { ContentProps } from "@/data/prayers";
import { IconButton } from "../IconButton";

interface PrayerTextProps {
  content?: ContentProps;
  setYoutube: () => void;
}

export function PrayerText({ content, setYoutube }: PrayerTextProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      className="bg-gray-950 pt-4"
    >
      <YStack className="w-full justify-center items-center mb-6 px-4">
        {content?.text && (
          <YStack className="w-full">
            {content.media?.youtubeId && (
              <XStack className="w-full gap-3 pb-4 px-4 justify-center">
                <Paragraph className="font-bold text-lg" text="Assista:" />
                <IconButton icon="youtube" onPress={setYoutube} />
              </XStack>
            )}
            {content.text.map((x, i) => (
              <Paragraph className="text-center" key={x + i} text={x} />
            ))}
          </YStack>
        )}

        {content && !content.text && (
          <Paragraph text="Não existe uma tradução cadastrada." />
        )}
      </YStack>
    </ScrollView>
  );
}
