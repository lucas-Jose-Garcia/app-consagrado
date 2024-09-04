import { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "@/styles/colors";
import { cn } from "@/lib/utils";
import { XStack, YStack } from "./stacks";
import { H1 } from "@/components/text/headings";
import { Paragraph } from "../text/paragraph";
import { SvgProps } from "react-native-svg";

interface ConteinerProps extends ViewProps {
  children: ReactNode;
}

interface ConteinerHeaderProps extends ViewProps {
  icone?: keyof typeof MaterialCommunityIcons.glyphMap;
  IconSvg?: React.FC<SvgProps>;
  title: string;
  subtitle?: string;
}

function Conteiner({ className, children, ...rest }: ConteinerProps) {
  return (
    <View className={cn("flex-1 bg-gray-950", className)} {...rest}>
      {children}
    </View>
  );
}

export function ConteinerHeader({ icone, IconSvg, title, subtitle, className, ...rest }: ConteinerHeaderProps) {
  return (
    <YStack className={className} {...rest}>
      <XStack className="mb-3 gap-2 justify-center items-center px-4 py-2">
        {icone && <MaterialCommunityIcons name={icone} size={28} color={colors.primary["400"]} />}
        {IconSvg && <IconSvg width={28} height={28} fill={colors.primary["400"]} />}
        <H1>{title}</H1>
      </XStack>
      {subtitle && (
        <XStack className="-mt-3 justify-center">
          <Paragraph text={subtitle} />
        </XStack>
      )}
    </YStack>
  );
}

function ConteinerBox({ className, children, ...rest }: ConteinerProps) {
  return (
    <View className={cn("flex-1 items-center pt-4 mx-4", className)} {...rest}>
      {children}
    </View>
  );
}

Conteiner.Header = ConteinerHeader;
Conteiner.Box = ConteinerBox;

export { Conteiner };
