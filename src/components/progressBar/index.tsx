import { View } from "react-native";
import { XStack, YStack } from "../conteineres/stacks";
import { Paragraph } from "../text/paragraph";

export interface ProgressBarProps {
  value: number;
  max: number;
  suffix: string;
}

export function ProgressBar({ value, max, suffix }: ProgressBarProps) {
  const widthPercentage = (value / max) * 100;
  return (
    <XStack className="flex flex-row w-full gap-3 justify-center items-center mt-1">
      <YStack className="flex flex-grow">
        <View className="h-2 bg-primary-800 rounded-md" />
        <View className="h-2 bg-primary-400 rounded-md absolute" style={{ width: `${widthPercentage}%` }} />
      </YStack>
      <Paragraph text={`${value} de ${max} ${suffix}`} className="pt-0.5" />
    </XStack>
  );
}
