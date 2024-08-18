import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, TextProps, View } from "react-native";

interface HeadingsProps extends TextProps {
  children: ReactNode;
}

const variantes = {
  default: "text-primary-400",
  normal: "text-gray-900",
};

export function H1({ className, children, ...rest }: HeadingsProps) {
  return (
    <Text className={cn("font-heading text-2xl text-gray-100", className)} {...rest}>
      {children}
    </Text>
  );
}

export function H2({ className, children, ...rest }: HeadingsProps) {
  return (
    <Text className={cn("font-subtible text-xl text-gray-100", className)} {...rest}>
      {children}
    </Text>
  );
}

export function H3({ className, children, ...rest }: HeadingsProps) {
  return (
    <Text className={cn("font-subtible text-base text-gray-100", className)} {...rest}>
      {children}
    </Text>
  );
}
