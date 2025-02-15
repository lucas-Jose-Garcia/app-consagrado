import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Text, TextProps } from "react-native";

export interface ParagraphProps extends TextProps {
  text: string;
  disabled?: boolean;
  children?: ReactNode;
}

export function Paragraph({ text, disabled = false, children, className, ...rest }: ParagraphProps) {
  const colorText = disabled ? "text-gray-500" : "text-gray-100";
  const parts = text.split(/\*\*([^*]+)\*\*/g);

  return (
    <Text className={cn("font-body", colorText, className)} {...rest}>
      {children && children}
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          return part;
        }
        return (
          <Text className="font-body font-bold text-lg" key={index}>
            {part}
          </Text>
        );
      })}
    </Text>
  );
}
