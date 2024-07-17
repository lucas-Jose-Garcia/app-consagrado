import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { XStack } from "../conteineres/stacks";
import { AntDesign } from "@expo/vector-icons";
import { Paragraph } from "../text/paragraph";
import { colors } from "@/styles/colors";
import clsx from "clsx";
import { cn, setVariant } from "@/lib/utils";
import { ReactNode } from "react";

type colorVariantsProps = "green" | "transparent";

interface SimpleButtonProps {
  text: string;
  icon?: keyof typeof AntDesign.glyphMap;
  children?: never;
}

interface ChildrenButtonProps {
  text?: never;
  icon?: never;
  children?: ReactNode;
}

type ItemButtonProps = SimpleButtonProps | ChildrenButtonProps;
type ButtonProps = ItemButtonProps &
  TouchableOpacityProps & {
    color?: colorVariantsProps;
    className?: string;
  };

interface IconProps {
  icon: keyof typeof AntDesign.glyphMap;
}

const colorVariant: { [key in colorVariantsProps]: string } = {
  transparent: "bg-transparent",
  green: "bg-green-900",
};

function Button({
  children,
  icon,
  text,
  color,
  className,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <XStack
        className={cn(
          "min-w-full justify-center items-center gap-2 p-3 rounded-md shadow-md",
          className,
          setVariant(colorVariant, color)
        )}
      >
        {children ? (
          children
        ) : (
          <>
            {icon && (
              <AntDesign name={icon} size={20} color={colors.gray[200]} />
            )}
            {text && <Paragraph text={text} />}
          </>
        )}
      </XStack>
    </TouchableOpacity>
  );
}

Button.Text = Paragraph;
Button.Icon = ({ icon }: IconProps) => (
  <AntDesign name={icon} size={20} color={colors.gray[200]} />
);

export { Button };
