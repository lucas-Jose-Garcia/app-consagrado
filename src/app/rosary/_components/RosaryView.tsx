import { Back } from "@/components/back";
import { Card } from "@/components/card/Card";
import { RosaryPrayerCard } from "@/components/card/RosaryPrayerCard";
import { Conteiner } from "@/components/conteineres/conteiner";
import { XStack, YStack } from "@/components/conteineres/stacks";
import { FloatingButton } from "@/components/floatingButton";
import { H2 } from "@/components/text/headings";
import { Paragraph } from "@/components/text/paragraph";
import { RosaryStepsProps } from "@/data/rosary";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, Dimensions, ImageBackground, ScrollView, View } from "react-native";

interface RosaryViewProps {
  currentRosaryStep: RosaryStepsProps;
  step: number;
  scrollToStep: (step: number) => void;
  lastOrder: number;
  scrollViewRef: React.RefObject<ScrollView>;
  scrollY: Animated.Value;
}

export function RosaryView({
  currentRosaryStep,
  step,
  scrollToStep,
  lastOrder,
  scrollViewRef,
  scrollY,
}: RosaryViewProps) {
  const HEADER_HEIGHT = 300;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT / 1.2],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 3, HEADER_HEIGHT],
    outputRange: [1, 0.3, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={{ width: Dimensions.get("window").width }}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          transform: [{ translateY: headerTranslateY }],
          opacity: imageOpacity,
          zIndex: 1,
        }}
      >
        <ImageBackground source={{ uri: currentRosaryStep.image }} className="w-full h-full justify-end">
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
              <H2>{currentRosaryStep.title}</H2>
            </YStack>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>

      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={26}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
      >
        <Conteiner.Box className="">
          {currentRosaryStep.offering && currentRosaryStep.offering.length > 0 && (
            <Card>
              <H2>Oferencimento</H2>
              <View className="space-y-2">
                <Paragraph text={currentRosaryStep.offering} />
              </View>
            </Card>
          )}
          {currentRosaryStep.prayers.map((prayer) => (
            <RosaryPrayerCard key={prayer.prayerId} prayerId={prayer.prayerId} />
          ))}
          <XStack className="w-full justify-between px-1 py-4">
            <FloatingButton onPress={() => scrollToStep(step - 1)} icon="navigate-before" disabled={step === 0} />
            <FloatingButton onPress={() => scrollToStep(step + 1)} icon="navigate-next" disabled={step === lastOrder} />
          </XStack>
        </Conteiner.Box>
      </Animated.ScrollView>
    </View>
  );
}
