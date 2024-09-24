import { ActivityIndicator, Image, ImageBackground, ImageSourcePropType } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { XStack, YStack } from "@/components/conteineres/stacks";
import YoutubePlayer from "react-native-youtube-iframe";

import { H2 } from "@/components/text/headings";
import { Back } from "@/components/back";
import { useEffect, useState } from "react";
import { InlineHeader } from "../header/inlineHeader";

const VIDEO_HEIGHT = 230;

export interface ConverProps {
  image: string;
  title: string;
  youtubeId?: string;
  showHeader?: boolean;
}

export function Conver({ image, title, youtubeId, showHeader = true }: ConverProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [currentSourse, setCurrentSource] = useState<ImageSourcePropType | undefined>({ uri: image });

  const handleError = () => {
    setCurrentSource(require("@/assets/cover-fallback.jpg"));
  };

  useEffect(() => {
    setCurrentSource({ uri: image });
  }, [image]);

  if (!youtubeId || youtubeId === "") {
    return (
      <ImageBackground source={currentSourse} className="w-full h-64 justify-end" onError={handleError}>
        <LinearGradient
          colors={[
            "rgba(3, 7, 18, 0.2)",
            "rgba(3, 7, 18, 0.2)",
            "rgba(3, 7, 18, 0.4)",
            "rgba(3, 7, 18, 0.8)",
            "rgba(3, 7, 18, 0.9)",
            "rgb(3, 7, 18)",
          ]}
          className="flex-1"
        >
          <XStack className="items-center justify-between mr-4">
            <Back />
          </XStack>
          <YStack className="flex-1 justify-end p-6">
            <H2>{title}</H2>
          </YStack>
        </LinearGradient>
      </ImageBackground>
    );
  }

  return (
    <YStack className="w-full">
      {showHeader && <InlineHeader title={title} />}
      <YStack className="h-[230px] justify-center">
        <YoutubePlayer videoId={youtubeId} height={videoReady ? VIDEO_HEIGHT : 0} onReady={() => setVideoReady(true)} />
        {!videoReady && <ActivityIndicator color={"#ff0000"} size={24} />}
      </YStack>
    </YStack>
  );
}
