import { useRef } from "react";
import { Animated, ScrollView } from "react-native";

export function useRosaryScroll() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const createScrollHandler = () =>
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true });

  return {
    scrollY,
    scrollViewRef,
    scrollHandler: createScrollHandler(),
  };
}
