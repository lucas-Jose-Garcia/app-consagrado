import { colors } from "@/styles/colors";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface IconButtonProps extends TouchableOpacityProps {
  icon: keyof typeof AntDesign.glyphMap;
  active?: boolean;
}

export function IconButton({ icon, active, ...rest }: IconButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <AntDesign
        name={icon}
        size={24}
        color={active ? colors.gray[300] : colors.gray[100]}
      />
    </TouchableOpacity>
  );
}
