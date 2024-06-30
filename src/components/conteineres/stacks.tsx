import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { View, ViewProps } from "react-native";

interface StackProps extends ViewProps {
  children: ReactNode;
}

function YStack({ className, children }: StackProps) {
  return <View className={cn("flex-col", className)}>{children}</View>;
}

function XStack({ className, children }: StackProps) {
  return <View className={cn("flex-row", className)}>{children}</View>;
}

export { YStack, XStack };
