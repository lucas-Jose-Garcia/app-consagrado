import { Text, View } from "react-native";
import { SliderProps } from ".";
import { SharedValue } from "react-native-reanimated";
import { Paragraph } from "../text/paragraph";
import { colors } from "./../../styles/colors";

interface PaginationProps {
  itens: SliderProps[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
}

export function Pagination({ itens, paginationIndex, scrollX }: PaginationProps) {
  const color = colors.gray[500];
  return (
    <View className="flex-row h-16 justify-center items-center">
      {itens.map((_, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: paginationIndex == index ? colors.gray[300] : colors.gray[500],
              height: 8,
              width: 8,
              borderRadius: 4,
              margin: 4,
            }}
          />
        );
      })}
    </View>
  );
}
