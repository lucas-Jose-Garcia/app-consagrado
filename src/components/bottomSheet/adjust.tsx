import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { Paragraph } from "../text/paragraph";
import { BottomSheetNative, BottomSheetRoot } from ".";
import { Button, ButtonIcon, ButtonText } from "../button";
import { XStack, YStack } from "../conteineres/stacks";
import { H1, H2 } from "../text/headings";
import { TouchableOpacity } from "react-native";
import { useProgress } from "@/hooks/progress";

interface ButtonProps {
  active: boolean;
  onPress: () => void;
}

interface BottomSheetProps {
  limit: number;
  onClose: () => void;
}

const BottonSheetAdjust = forwardRef(function BottonSheetAdjust(
  { limit, onClose }: BottomSheetProps,
  ref: ForwardedRef<BottomSheetNative>
) {
  const progress = useProgress();
  const [currentDay, setCurrentDay] = useState(0);

  const fetchDay = async () => {
    const data = await progress.get();
    setCurrentDay(data.day);
  };

  const increment = () => setCurrentDay((prevDay) => (prevDay < limit ? prevDay + 1 : limit));
  const decrement = () => setCurrentDay((prevDay) => (prevDay > 0 ? prevDay - 1 : 0));

  const save = async () => {
    await progress.set(currentDay);
    onClose();
  };

  useEffect(() => {
    fetchDay();
  }, []);

  return (
    <BottomSheetRoot ref={ref}>
      <BottomSheetView className="bg-gray-900 px-6">
        <H2>Ajustar Progresso</H2>
        <XStack className="w-full justify-center">
          <XStack className="items-center gap-8 mt-6">
            <Button size="content" onPress={decrement}>
              <ButtonIcon icon="minus" />
            </Button>
            <H1>{currentDay}</H1>
            <Button size="content" onPress={increment}>
              <ButtonIcon icon="plus" />
            </Button>
          </XStack>
        </XStack>
        <Button text="Salvar" color="primary" className="my-6" onPress={save} />
      </BottomSheetView>
    </BottomSheetRoot>
  );
});

export { BottonSheetAdjust };
