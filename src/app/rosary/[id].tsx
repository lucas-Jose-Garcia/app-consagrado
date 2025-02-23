import { RosaryStepsProps, getRosaryStepsById } from "@/data/rosary";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState, useRef } from "react";
import { ScrollView, Animated, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { RosaryView } from "./_components/RosaryView";
import { Conteiner } from "@/components/conteineres/conteiner";
import { FloatingButton } from "@/components/floatingButton";

export default function Prayer() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { width: screenWidth } = Dimensions.get("window");

  const [rosarySteps, setRosarySteps] = useState<RosaryStepsProps[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);
  const scrollViewRefs = useRef<{ [key: number]: React.RefObject<ScrollView> }>({});
  const scrollViewYs = useRef<{ [key: number]: Animated.Value }>({});

  const updateCurrentIndex = (newIndex: number) => {
    setCurrentIndex((prevIndex) => {
      if (newIndex !== prevIndex) {
        scrollViewRefs.current[prevIndex]?.current?.scrollTo({ y: 0, animated: false });
        return newIndex;
      }
      return prevIndex;
    });
  };

  const scrollToStep = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
        viewOffset: 0,
      });
      updateCurrentIndex(index);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / screenWidth);

    updateCurrentIndex(newIndex);
  };

  const getScrollY = (index: number) => {
    if (!scrollViewYs.current[index]) {
      scrollViewYs.current[index] = new Animated.Value(0);
    }
    return scrollViewYs.current[index];
  };

  const getScrollViewRef = (index: number) => {
    if (!scrollViewRefs.current[index]) {
      scrollViewRefs.current[index] = React.createRef<ScrollView>();
    }
    return scrollViewRefs.current[index];
  };

  const buttonsOpacity = getScrollY(currentIndex).interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useFocusEffect(
    useCallback(() => {
      if (id !== undefined) {
        const data = getRosaryStepsById(id);
        setRosarySteps(data);
      }
    }, [id])
  );

  return (
    <Conteiner>
      {rosarySteps && (
        <>
          <FlatList
            ref={flatListRef}
            data={rosarySteps}
            keyExtractor={(item) => item.order.toString()}
            renderItem={({ item, index }) => (
              <RosaryView
                currentRosaryStep={item}
                step={index}
                scrollToStep={scrollToStep}
                lastOrder={rosarySteps.length - 1}
                scrollViewRef={getScrollViewRef(index)}
                scrollY={getScrollY(index)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
            bounces={false}
            pagingEnabled={true}
            snapToAlignment="center"
            snapToInterval={screenWidth}
            decelerationRate={0}
            onMomentumScrollEnd={handleScroll}
            scrollEventThrottle={16}
            disableIntervalMomentum={true}
            snapToOffsets={rosarySteps?.map((_, index) => index * screenWidth)}
          />
          <Animated.View style={{ opacity: buttonsOpacity }}>
            <FloatingButton
              onPress={() => scrollToStep(currentIndex - 1)}
              icon="navigate-before"
              position="bottomLeft"
              disabled={currentIndex === 0}
            />
            <FloatingButton
              onPress={() => scrollToStep(currentIndex + 1)}
              icon="navigate-next"
              position="bottomRight"
              disabled={currentIndex === rosarySteps.length - 1}
            />
          </Animated.View>
        </>
      )}
    </Conteiner>
  );
}
