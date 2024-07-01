import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { View, ViewProps } from "react-native";

interface StackProps extends ViewProps {
  children: ReactNode;
}

function YStack({ className, children, ...rest }: StackProps) {
  return (
    <View className={cn("flex-col", className)} {...rest}>
      {children}
    </View>
  );
}

function XStack({ className, children, ...rest }: StackProps) {
  return (
    <View className={cn("flex-row", className)} {...rest}>
      {children}
    </View>
  );
}

export { YStack, XStack };
