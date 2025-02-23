import { colors } from "@/styles/colors";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface IconButtonProps extends TouchableOpacityProps {
  AntDesignIcon?: keyof typeof AntDesign.glyphMap;
  MaterialCommunityIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  EntypoIcon?: keyof typeof Entypo.glyphMap;
  disabled?: boolean;
}

export function IconButton({ AntDesignIcon, MaterialCommunityIcon, EntypoIcon, disabled, ...rest }: IconButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} disabled={disabled} className="bg-zinc-700 rounded-full p-2" {...rest}>
      {AntDesignIcon && (
        <AntDesign name={AntDesignIcon} size={24} color={disabled ? colors.gray[500] : colors.gray[100]} />
      )}
      {MaterialCommunityIcon && (
        <MaterialCommunityIcons
          name={MaterialCommunityIcon}
          size={24}
          color={disabled ? colors.gray[500] : colors.gray[100]}
        />
      )}
      {EntypoIcon && <Entypo name={EntypoIcon} size={24} color={disabled ? colors.gray[500] : colors.gray[100]} />}
    </TouchableOpacity>
  );
}
