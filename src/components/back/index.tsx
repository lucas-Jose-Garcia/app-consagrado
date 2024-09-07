import { colors } from "@/styles/colors";
import { AntDesign } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { YStack } from "../conteineres/stacks";

interface BackProps {
  replace?: Href;
}

export function Back({ replace }: BackProps) {
  function onPress() {
    if (replace) {
      router.replace(replace);
    } else {
      router.back();
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <YStack
        className="w-10 h-10 rounded-3xl justify-center items-center m-4"
        style={{ backgroundColor: "rgba(3, 7, 18, 0.4)" }}
      >
        <AntDesign name="arrowleft" size={24} color={colors.gray[300]} />
      </YStack>
    </TouchableOpacity>
  );
}
