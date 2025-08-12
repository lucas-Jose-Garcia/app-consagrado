import { Animated, Dimensions, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Back } from "@/components/back";
import { XStack, YStack } from "@/components/conteineres/stacks";
import { H2 } from "@/components/text/headings";

interface RosaryHeaderProps {
  title: string;
  imageUri: string;
  scrollY: Animated.Value;
  height?: number;
}

const GRADIENT_COLORS = [
  "rgba(3, 7, 18, 0.2)",
  "rgba(3, 7, 18, 0.2)",
  "rgba(3, 7, 18, 0.4)",
  "rgba(3, 7, 18, 0.8)",
  "rgba(3, 7, 18, 0.9)",
  "rgb(3, 7, 18)",
];

export function RosaryHeader({ title, imageUri, scrollY, height = 300 }: RosaryHeaderProps) {
  const screenWidth = Dimensions.get("window").width;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, height],
    outputRange: [0, -height / 1.2],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, height / 3, height],
    outputRange: [1, 0.3, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height,
        width: screenWidth,
        transform: [{ translateY: headerTranslateY }],
        opacity: imageOpacity,
        zIndex: 1,
      }}
    >
      <ImageBackground source={{ uri: imageUri }} className="w-full h-full justify-end" resizeMode="cover">
        <LinearGradient colors={GRADIENT_COLORS} className="flex-1">
          <XStack className="items-center justify-between mr-4">
            <Back />
          </XStack>
          <YStack className="flex-1 justify-end p-6">
            <H2>{title}</H2>
          </YStack>
        </LinearGradient>
      </ImageBackground>
    </Animated.View>
  );
}
