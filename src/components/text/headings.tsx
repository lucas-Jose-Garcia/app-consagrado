import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Text, TextProps } from "react-native";

interface HeadingsProps extends TextProps {
  children: ReactNode;
}

const variantes = {
  default: "text-primary-400",
  normal: "text-gray-900",
};

export function H1({ className, children }: HeadingsProps) {
  return (
    <Text className={cn("font-heading text-2xl text-gray-100", className)}>
      {children}
    </Text>
  );
}

export function H2({ className, children }: HeadingsProps) {
  return (
    <Text className={cn("font-subtible text-xl text-gray-100", className)}>
      {children}
    </Text>
  );
}
