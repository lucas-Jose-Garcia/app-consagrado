import { Pressable } from "react-native";
import { Paragraph } from "../text/paragraph";
import clsx from "clsx";

interface ItemProps {
  title: string;
  onPress: () => void;
  selected?: boolean;
}

export function Item({ title, onPress, selected }: ItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "h-12 p-3 rounded-lg justify-center",
        selected ? "bg-primary-400" : "bg-zinc-700"
      )}
    >
      <Paragraph className="text-center" text={title} />
    </Pressable>
  );
}
