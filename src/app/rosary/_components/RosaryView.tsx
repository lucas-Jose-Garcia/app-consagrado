import { Animated, Dimensions, ScrollView, View } from "react-native";
import { RosaryStepsProps } from "@/data/rosary";
import { RosaryHeader } from "./RosaryHeader";
import { RosaryContent } from "./RosaryContent";

interface RosaryViewProps {
  currentRosaryStep: RosaryStepsProps;
  step: number;
  scrollToStep: (step: number) => void;
  lastOrder: number;
  scrollViewRef: React.RefObject<ScrollView>;
  scrollY: Animated.Value;
}

const HEADER_HEIGHT = 300;

export function RosaryView({
  currentRosaryStep,
  step,
  scrollToStep,
  lastOrder,
  scrollViewRef,
  scrollY,
}: RosaryViewProps) {
  const screenWidth = Dimensions.get("window").width;

  const scrollHandler = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true });

  return (
    <View style={{ width: screenWidth }}>
      <RosaryHeader
        title={currentRosaryStep.title}
        imageUri={currentRosaryStep.image}
        scrollY={scrollY}
        height={HEADER_HEIGHT}
      />

      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <RosaryContent
          rosaryStep={currentRosaryStep}
          currentStep={step}
          totalSteps={lastOrder}
          onNavigateToStep={scrollToStep}
        />
      </Animated.ScrollView>
    </View>
  );
}
