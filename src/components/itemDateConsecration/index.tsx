import { View, TouchableOpacity } from "react-native";
import { Card } from "../card/Card";
import { H2 } from "../text/headings";
import { Paragraph } from "../text/paragraph";
import { XStack, YStack } from "../conteineres/stacks";
import { router } from "expo-router";

export interface DateConsecrationItem {
  id: string;
  title: string;
  month: number;
  day: number;
}

interface SelectDateConsecrationProps {
  item: DateConsecrationItem;
  onSelectDate?: (item: DateConsecrationItem) => void;
}

export function ItemDateConsecration({ item, onSelectDate }: SelectDateConsecrationProps) {
  const formatDate = (month: number, day: number): string => {
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    return `${day} de ${monthNames[month - 1]}`;
  };

  const handlePress = (item: DateConsecrationItem) => {
    if (onSelectDate) {
      onSelectDate(item);
    } else {
      // Comportamento padrão - pode ser usado para debug ou ação alternativa
      console.log("Data selecionada:", item.title);
    }
    router.back();
  };

  return (
    <TouchableOpacity key={item.id} activeOpacity={0.7} onPress={() => handlePress(item)}>
      <Card>
        <XStack className="items-center justify-between">
          <YStack className="flex-1">
            <H2>{item.title}</H2>
            <Paragraph text={formatDate(item.month, item.day)} className="text-gray-500 mt-1" />
          </YStack>
          {onSelectDate && (
            <View className="ml-4">
              <View className="w-6 h-6 rounded-full border-2 border-gray-300" />
            </View>
          )}
        </XStack>
      </Card>
    </TouchableOpacity>
  );
}
