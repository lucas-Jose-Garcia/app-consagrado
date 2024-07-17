import { Paragraph } from "@/components/text/paragraph";
import { Card } from "@/components/card/Card";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

interface ExpandableCardProps {
  text: string;
  numberOfLines: number;
  onPress: () => void;
}

export function ExpandableCard({
  text,
  numberOfLines,
  onPress,
}: ExpandableCardProps) {
  const [textHeight, setTextHeight] = useState<Number | null>(null);
  const [fullTextHeight, setFullTextHeight] = useState<Number | null>(null);
  return (
    <Card>
      <Paragraph
        text={text}
        numberOfLines={numberOfLines}
        onLayout={(event) => {
          setTextHeight(event.nativeEvent.layout.height);
        }}
      />
      <Paragraph
        text={text}
        className="absolute opacity-0"
        onLayout={(event) => {
          setFullTextHeight(event.nativeEvent.layout.height);
        }}
      />
      {textHeight && fullTextHeight && textHeight < fullTextHeight && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Paragraph text="Exibir mais" className="font-bold" />
        </TouchableOpacity>
      )}
    </Card>
  );
}
