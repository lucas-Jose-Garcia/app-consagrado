import { XStack, YStack } from "@/components/conteineres/stacks";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { ActivityIndicator, DimensionValue, FlatList, TouchableOpacity, View } from "react-native";
import { H3 } from "../text/headings";
import { colors } from "@/styles/colors";

export interface TabBarItemProps {
  key: string;
  renderItem: ReactNode;
}

export interface TabBarProps {
  itens: TabBarItemProps[];
  enableScroll?: boolean;
  error?: {
    isError: boolean;
    renderError: ReactNode;
  };
}

export function TabBar({
  itens,
  enableScroll = false,
  error: { isError, renderError } = { isError: false, renderError: null },
}: TabBarProps) {
  const [flatListRef, setFlatListRef] = useState<FlatList | null>(null);
  const [activeItem, setActiveItem] = useState(itens[0].key);

  function handleSelect(item: string) {
    setActiveItem(item);
    onScrollToItemSelected(itens.findIndex((x) => x.key === item));
  }

  function onScrollToItemSelected(index: number) {
    flatListRef?.scrollToIndex({ animated: true, index: index });
  }

  const widthForItem: DimensionValue = `${100 / itens.length}%`;

  return (
    <>
      {enableScroll ? (
        <XStack className="bg-gray-900 mt-2">
          <FlatList
            data={itens.map((x) => x.key)}
            ref={(ref) => setFlatListRef(ref)}
            keyExtractor={(item) => item}
            contentContainerStyle={{
              height: 54,
              gap: 12,
              justifyContent: "center",
            }}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.7} onPress={() => handleSelect(item)} className="min-w-1/2">
                <View
                  className={cn(
                    "h-full justify-center items-center px-4 pt-0.5 ",
                    activeItem === item
                      ? "border-0 border-b-2 border-solid border-b-primary-400"
                      : "border-0 border-b-2 border-solid border-b-gray-900"
                  )}
                >
                  <H3 className="uppercase">{item}</H3>
                </View>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </XStack>
      ) : (
        <XStack className="h-14 w-full bg-gray-900 mt-2">
          {itens
            .map((x) => x.key)
            .map((item) => (
              <TouchableOpacity
                key={item}
                activeOpacity={0.7}
                onPress={() => handleSelect(item)}
                style={{ width: widthForItem }}
              >
                <XStack
                  className={cn(
                    "flex-1 justify-center items-center px-4 pt-0.5",
                    activeItem === item
                      ? "border-0 border-b-2 border-solid border-b-primary-400"
                      : "border-0 border-b-2 border-solid border-b-gray-900"
                  )}
                >
                  <H3 className="uppercase">{item}</H3>
                </XStack>
              </TouchableOpacity>
            ))}
        </XStack>
      )}
      {!isError &&
        itens.map((x) =>
          x.key === activeItem ? (
            <View key={x.key} className="flex-1">
              {x.renderItem ? (
                x.renderItem
              ) : (
                <View className="flex-1 justify-center">
                  <ActivityIndicator color={colors.primary[400]} size={"large"} />
                </View>
              )}
            </View>
          ) : null
        )}
      {isError && renderError}
    </>
  );
}
