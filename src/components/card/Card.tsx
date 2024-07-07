import { ReactNode } from "react";
import { YStack } from "../conteineres/stacks";
import { ViewProps } from "react-native";

interface CardProps extends ViewProps {
  children: ReactNode;
}

export function Card({ children, ...rest }: CardProps) {
  return (
    <YStack className="w-full mt-4 p-4 rounded-md bg-gray-900" {...rest}>
      {children}
    </YStack>
  );
}
