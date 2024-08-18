import { ActivityIndicator, ImageBackground } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { XStack, YStack } from "@/components/conteineres/stacks";
import YoutubePlayer from "react-native-youtube-iframe";

import { H2 } from "@/components/text/headings";
import { Back } from "@/components/back";
import { useState } from "react";

const VIDEO_HEIGHT = 230;

export interface ConverProps {
  image: string;
  title: string;
  youtubeId?: string;
}

export function Conver({ image, title, youtubeId }: ConverProps) {
  const [videoReady, setVideoReady] = useState(false);

  if (!youtubeId || youtubeId === "") {
    return (
      <ImageBackground source={{ uri: image }} className="w-full h-64 justify-end">
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
    <YStack>
      <XStack className="items-center gap-1">
        <Back />
        <H2 className="w-5/6" numberOfLines={1}>
          {title}
        </H2>
      </XStack>
      <YStack className="h-[230px] justify-center">
        <YoutubePlayer videoId={youtubeId} height={videoReady ? VIDEO_HEIGHT : 0} onReady={() => setVideoReady(true)} />
        {!videoReady && <ActivityIndicator color={"#ff0000"} size={24} />}
      </YStack>
    </YStack>
  );
}
