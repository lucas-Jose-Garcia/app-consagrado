import { Dimensions, Image, ImageBackground, Share, TouchableOpacity, View } from "react-native";
import { Paragraph } from "../text/paragraph";
import { H2 } from "../text/headings";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "../progressBar";
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { Href, Link, router } from "expo-router";

interface SliderProps {
  title: string;
  description: string;
  image: string;
  scrollX: SharedValue<number>;
  index: number;
  id: string;
  link: Href<string>;
  progress?: {
    current: number;
    total: number;
    suffix: string;
  };
}

const { width, height } = Dimensions.get("screen");

export function SliderItem({ title, description, image, scrollX, index, id, link, progress = undefined }: SliderProps) {
  const itemWidth = width * 0.85;
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth],
            [-itemWidth * 0.15, 0, itemWidth * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const onPress = () => {
    router.push(link);
  };
  return (
    <Animated.View
      className="justify-center items-center gap-5 shadow-md"
      style={[{ width: itemWidth }, rnAnimatedStyle]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Image
          className="rounded-lg"
          source={{ uri: image }}
          style={{ width: itemWidth * 0.83, height: height * 0.65 }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          className="absolute p-3 rounded-lg justify-end items-center"
          style={{ width: itemWidth * 0.83, height: height * 0.65 }}
        >
          <H2>{title}</H2>
          <Paragraph text={description} className="text-center" />

          {progress && progress.current < progress.total && (
            <ProgressBar max={progress.total} value={progress.current} suffix={progress.suffix} />
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}
