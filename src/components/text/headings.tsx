import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Text, TextProps } from "react-native";

interface H1Props extends TextProps {
  children: ReactNode;
}

const variantes = {
  default: "text-primary-400",
  normal: "text-gray-900",
};

export function H1({ className, children }: H1Props) {
  return (
    <Text className={cn("font-heading text-2xl text-gray-900", className)}>
      {children}
    </Text>
  );
}
