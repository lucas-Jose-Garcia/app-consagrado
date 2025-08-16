import { Text, View, Dimensions, ViewToken } from "react-native";
import { SliderItem } from "./SliderItem";
import { FlatList } from "react-native-gesture-handler";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { Pagination } from "./Pagination";
import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Href } from "expo-router";

export interface SliderProps {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  link: Href<string>;
  progress?: {
    current: number;
    total: number;
  };
}

export interface SliderRef {
  selectCard: (id: string) => void;
}

export const Slider = forwardRef<SliderRef, { data: SliderProps[]; activeId: string | null }>(
  ({ data, activeId }, ref) => {
    const scrollX = useSharedValue(0);
    const [paginationIndex, setPaginationIndex] = useState(1);
    const flatListRef = useRef<Animated.FlatList<SliderProps>>(null);

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

    const getItemLayout = (data: ArrayLike<SliderProps> | null | undefined, index: number) => {
      return {
        length: itemWidth,
        offset: itemWidth * index,
        index,
      };
    };

    // Expor função selectCard através da ref
    useImperativeHandle(ref, () => ({
      selectCard: (id: string) => {
        console.log("Selecting card with id:", id);
        const index = data.findIndex((item) => item.id === id);
        if (index !== -1 && flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.4,
          });
          setPaginationIndex(index);
        }
      },
    }));

    // Função para lidar com falhas no scrollToIndex
    const onScrollToIndexFailed = (info: {
      index: number;
      highestMeasuredFrameIndex: number;
      averageItemLength: number;
    }) => {
      const wait = new Promise((resolve) => setTimeout(resolve, 500));
      wait.then(() => {
        flatListRef.current?.scrollToIndex({
          index: info.index,
          animated: true,
          viewPosition: 0.4,
        });
      });
    };

    return (
      <View>
        <Animated.FlatList
          ref={flatListRef}
          data={data}
          renderItem={({ item, index }) => (
            <SliderItem
              data={{
                ...item,
                scrollX,
                index,
                active: activeId == item.id,
              }}
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
          getItemLayout={getItemLayout}
          onScrollToIndexFailed={onScrollToIndexFailed}
        />
        <Pagination itens={data} paginationIndex={paginationIndex} scrollX={scrollX} />
      </View>
    );
  }
);
