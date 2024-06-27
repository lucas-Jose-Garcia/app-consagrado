import { ReactNode } from "react";
import { View, ViewProps } from "react-native";

import { cn } from "@/lib/utils";

interface ConteinerProps extends ViewProps {
  children: ReactNode;
}

function Conteiner({ className, children, ...rest }: ConteinerProps) {
  return (
    <View className={cn("flex-1", className)} {...rest}>
      {children}
    </View>
  );
}

function ConteinerBox({ className, children, ...rest }: ConteinerProps) {
  return (
    <View className={cn("items-center mx-4", className)} {...rest}>
      {children}
    </View>
  );
}

Conteiner.Box = ConteinerBox;

export { Conteiner };
