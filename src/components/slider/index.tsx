import { Text, View, Dimensions, ViewToken } from "react-native";
import { SliderItem } from "./SliderItem";
import { FlatList } from "react-native-gesture-handler";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { Pagination } from "./Pagination";
import { useRef, useState } from "react";
import { Href } from "expo-router";

export interface SliderProps {
  id: string;
  title: string;
  description: string;
  image: string;
  link: Href<string>;
}

export function Slider({ data }: { data: SliderProps[] }) {
  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(1);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
      setPaginationIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

  const { width } = Dimensions.get("screen");
  const itemWidth = width * 0.85;
  return (
    <View>
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => (
          <SliderItem
            title={item.title}
            description={item.description}
            image={item.image}
            scrollX={scrollX}
            index={index}
            id={item.id}
            link={item.link}
          />
        )}
        keyExtractor={(item) => item.title}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        snapToInterval={itemWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={onScrollHandler}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <Pagination itens={data} paginationIndex={paginationIndex} scrollX={scrollX} />
    </View>
  );
}
