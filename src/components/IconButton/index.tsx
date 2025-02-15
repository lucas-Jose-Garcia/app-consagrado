import { colors } from "@/styles/colors";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface IconButtonProps extends TouchableOpacityProps {
  AntDesignIcon?: keyof typeof AntDesign.glyphMap;
  MaterialCommunityIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  active?: boolean;
}

export function IconButton({ AntDesignIcon, MaterialCommunityIcon, active, ...rest }: IconButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      {AntDesignIcon && (
        <AntDesign name={AntDesignIcon} size={24} color={active ? colors.gray[300] : colors.gray[100]} />
      )}
      {MaterialCommunityIcon && (
        <MaterialCommunityIcons
          name={MaterialCommunityIcon}
          size={24}
          color={active ? colors.gray[300] : colors.gray[100]}
        />
      )}
    </TouchableOpacity>
  );
}
