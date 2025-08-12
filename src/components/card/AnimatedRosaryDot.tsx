import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { colors } from "@/styles/colors";

interface AnimatedRosaryDotProps {
  active: boolean;
  size?: number;
  innerSize?: number;
}

export function AnimatedRosaryDot({ active, size = 16, innerSize = 10 }: AnimatedRosaryDotProps) {
  const animation = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    animation.value = withTiming(active ? 1 : 0, { duration: 350 });
  }, [active, animation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(animation.value, [0, 1], [colors.gray[400], colors.secondary[500]]),
      transform: [
        {
          scale: withSpring(animation.value === 1 ? 1.15 : 1, { damping: 10 }),
        },
      ],
    };
  });

  const containerStyle = {
    height: size,
    width: size,
    borderRadius: size / 2,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    margin: 2,
  };

  const innerStyle = {
    height: innerSize,
    width: innerSize,
    backgroundColor: colors.gray[900],
    borderRadius: innerSize / 2,
  };

  return (
    <Animated.View style={[containerStyle, animatedStyle]}>
      <View style={innerStyle} />
    </Animated.View>
  );
}
