import { cn } from "@/lib/utils";
import { Text, TextProps } from "react-native";

interface ParagraphProps extends TextProps {
  text: string;
}

export function Paragraph({ text, className, ...rest }: ParagraphProps) {
  return (
    <Text className={cn("font-body", className)} {...rest}>
      {text}
    </Text>
  );
}
