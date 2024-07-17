import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { XStack } from "../conteineres/stacks";
import { colors } from "@/styles/colors";
import clsx from "clsx";

interface ActionButtonProps extends TouchableOpacityProps {
  icon: keyof typeof AntDesign.glyphMap;
  active?: boolean;
}

export function ActionButton({
  icon,
  active = true,
  ...rest
}: ActionButtonProps) {
  const borderColor = active ? "border-gray-300" : "border-gray-900";
  return (
    <TouchableOpacity
      activeOpacity={active ? 0.7 : 1}
      {...rest}
      disabled={!active}
    >
      <XStack className={`border-2 p-4 rounded-full ${borderColor}`}>
        <AntDesign
          name={icon}
          size={24}
          color={active ? colors.gray[300] : colors.gray[900]}
        />
      </XStack>
    </TouchableOpacity>
  );
}
