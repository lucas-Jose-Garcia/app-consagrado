import { colors } from "@/styles/colors";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Circle } from "react-native-svg";

interface ProgressCircleProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // Progress as a percentage (0 to 100)
  color?: string;
  backgroundColor?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ size = 30, strokeWidth = 5, progress }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View className="justify-center items-center" style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.gray[300]}
          opacity={0.3}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primary[400]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};
