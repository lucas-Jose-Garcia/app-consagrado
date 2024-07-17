import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Text, TextProps } from "react-native";

interface ParagraphProps extends TextProps {
  text: string;
  children?: ReactNode;
}

export function Paragraph({
  text,
  children,
  className,
  ...rest
}: ParagraphProps) {
  return (
    <Text className={cn("font-body text-gray-100", className)} {...rest}>
      {children && children}
      {text}
    </Text>
  );
}
