import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

type Position = "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "none";

interface FloatingButtonProps extends TouchableOpacityProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  position?: Position;
  size?: number;
  color?: string;
  disabled?: boolean;
}

export function FloatingButton({ icon, position = "none", size = 24, disabled, ...rest }: FloatingButtonProps) {
  const getPositionClasses = (pos: Position): string => {
    switch (pos) {
      case "topLeft":
        return "absolute top-5 left-5";
      case "topRight":
        return "absolute top-5 right-5";
      case "bottomLeft":
        return "absolute bottom-5 left-5";
      case "bottomRight":
        return "absolute bottom-5 right-5";
      default:
        return "";
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`w-14 h-14 rounded-full justify-center items-center shadow-lg
        ${disabled ? "bg-gray-400 opacity-65" : "bg-primary-400"}
        ${getPositionClasses(position)}`}
      disabled={disabled}
      {...rest}
    >
      <MaterialIcons name={icon} size={size} color={disabled ? "#000000" : "#fff"} />
    </TouchableOpacity>
  );
}
