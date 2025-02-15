import { ScrollView, Switch } from "react-native";
import { XStack, YStack } from "../conteineres/stacks";
import { Paragraph } from "../text/paragraph";
import { ContentProps } from "@/data/prayers";
import { IconButton } from "../IconButton";
import { useState } from "react";
import { colors } from "@/styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

interface PrayerTextProps {
  content?: ContentProps;
  translate?: ContentProps;
  setYoutube: () => void;
}

export function PrayerText({ content, translate, setYoutube }: PrayerTextProps) {
  const [showTranslate, setShowTranslate] = useState(false);

  const toggleTranslate = () => setShowTranslate((prevState) => !prevState);

  return (
    <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never" className="bg-gray-950 pt-4">
      <YStack className="w-full justify-center items-center mb-6 px-4">
        {content?.text && (
          <YStack className="w-full">
            {content.media?.youtubeId && (
              <XStack className={cn("w-full  pb-4 px-4", translate?.text ? "justify-between" : "justify-center")}>
                <XStack className="gap-3">
                  <Paragraph className="font-bold text-lg" text="Assista:" />
                  <IconButton AntDesignIcon="youtube" onPress={setYoutube} />
                </XStack>
                {translate?.text && (
                  <XStack className="gap-3">
                    <Paragraph className="font-bold text-lg" text="Traduzir:" />
                    <IconButton
                      MaterialCommunityIcon="google-translate"
                      onPress={toggleTranslate}
                      active={showTranslate}
                    />
                  </XStack>
                )}
              </XStack>
            )}
            {translate?.text && showTranslate
              ? content.text.map((x, i) => (
                  <YStack key={i}>
                    <Paragraph className="text-center" text={x} />
                    <Paragraph className="text-center" text={translate.text[i] ?? ""} disabled />
                  </YStack>
                ))
              : content.text.map((x, i) => <Paragraph className="text-center" key={x + i} text={x} />)}
          </YStack>
        )}

        {content && !content.text && <Paragraph text="Não existe uma tradução cadastrada." />}
      </YStack>
    </ScrollView>
  );
}
