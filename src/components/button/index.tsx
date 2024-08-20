import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { XStack } from "../conteineres/stacks";
import { AntDesign } from "@expo/vector-icons";
import { Paragraph } from "../text/paragraph";
import { colors } from "@/styles/colors";
import { cn, setVariant } from "@/lib/utils";
import { ReactNode } from "react";
import { SvgProps } from "react-native-svg";

type colorVariantsProps = "green" | "transparent" | "primary";
type sizeVariantProps = "full" | "content";

interface SimpleButtonProps {
  text: string;
  icon?: keyof typeof AntDesign.glyphMap;
  IconSvg?: React.FC<SvgProps>;
  children?: never;
}

interface ChildrenButtonProps {
  text?: never;
  icon?: never;
  IconSvg?: never;
  children?: ReactNode;
}

type ItemButtonProps = SimpleButtonProps | ChildrenButtonProps;
type ButtonProps = ItemButtonProps &
  TouchableOpacityProps & {
    color?: colorVariantsProps;
    size?: sizeVariantProps;
    className?: string;
  };

interface IconProps {
  icon: keyof typeof AntDesign.glyphMap;
  disabled?: boolean;
}

const colorVariant: { [key in colorVariantsProps]: string } = {
  transparent: "bg-transparent",
  green: "bg-green-900",
  primary: "bg-primary-400",
};

const disabledColorVariant: { [key in colorVariantsProps]: string } = {
  transparent: "bg-transparent",
  green: "bg-green-700",
  primary: "bg-primary-800",
};

const sizeVariant: { [key in sizeVariantProps]: string } = {
  full: "min-w-full",
  content: "",
};

function Button({ children, icon, IconSvg, text, color, size, className, disabled, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} disabled={disabled} {...rest}>
      <XStack
        className={cn(
          "justify-center items-start gap-2 p-3 rounded-md shadow-md",
          className,
          setVariant(colorVariant, color),
          setVariant(sizeVariant, size),
          disabled ? setVariant(disabledColorVariant, color) : ""
        )}
      >
        {children ? (
          children
        ) : (
          <>
            {icon && <AntDesign name={icon} size={20} color={colors.gray[200]} />}
            {IconSvg && <IconSvg width={28} height={20} fill={colors.gray[200]} />}
            {text && <Paragraph text={text} />}
          </>
        )}
      </XStack>
    </TouchableOpacity>
  );
}

Button.Text = Paragraph;
Button.Icon = ({ icon, disabled = false }: IconProps) => (
  <AntDesign name={icon} size={20} color={disabled ? colors.gray[500] : colors.gray[200]} />
);

export { Button };
