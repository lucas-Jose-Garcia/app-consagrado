import { Dimensions, Image, ImageBackground, Share, TouchableOpacity, View, Text } from "react-native";
import { Paragraph } from "../text/paragraph";
import { H2, H3 } from "../text/headings";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "../progressBar";
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { Href, Link, router } from "expo-router";
import { SliderProps } from ".";
import { ProgressCircle } from "../progressCircle";

interface SliderItemProps extends SliderProps {
  scrollX: SharedValue<number>;
  index: number;
  active: boolean;
}

interface SliderItemComponentProps {
  data: SliderItemProps;
}

const { width, height } = Dimensions.get("screen");

export function SliderItem({
  data: { title, subtitle, description, image, scrollX, index, active, link, progress },
}: SliderItemComponentProps) {
  const itemWidth = width * 0.85;
  const rnAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth];
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            inputRange,
            [-itemWidth * 0.2, 0, itemWidth * 0.2],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(scrollX.value, inputRange, [0.85, 1, 0.85], Extrapolation.CLAMP),
        },
      ],
      opacity: interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], Extrapolation.CLAMP),
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
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="relative">
        {active && (
          <View className="absolute top-2 z-10 bg-blue-500/60 px-3 py-1 rounded-full self-center">
            <Text className="text-white text-sm font-semibold">Etapa Atual</Text>
          </View>
        )}
        {progress && (
          <View className="absolute top-2 left-2 z-10 self-start">
            <ProgressCircle progress={progress ? (progress.current / progress.total) * 100 : 0} size={25} />
          </View>
        )}
        <Image
          className="rounded-lg grayscale"
          source={{ uri: image }}
          style={{ width: itemWidth * 0.83, height: height * 0.65 }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          className="absolute p-3 rounded-lg justify-end items-center"
          style={{ width: itemWidth * 0.83, height: height * 0.65 }}
        >
          {subtitle && <H3 className="text-gray-300 p-1 rounded-md text-center">{subtitle}</H3>}
          <H2>{title}</H2>
          <Paragraph text={description} className="text-center" />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}
