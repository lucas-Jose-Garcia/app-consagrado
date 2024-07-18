import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { ForwardedRef, forwardRef } from "react";
import { Paragraph } from "../text/paragraph";
import { BottomSheetNative, BottomSheetRoot } from ".";
import { Button } from "../button";
import { XStack, YStack } from "../conteineres/stacks";
import { H2 } from "../text/headings";

interface BottomSheetProps {
  title: string;
  text: string;
  stage: string;
  nextOnPress: () => void;
  previousOnPress: () => void;
}

const BottonSheetPrayer = forwardRef(function BottonSheetPrayer(
  { title, text, stage, previousOnPress, nextOnPress }: BottomSheetProps,
  ref: ForwardedRef<BottomSheetNative>
) {
  return (
    <BottomSheetRoot ref={ref}>
      <BottomSheetView className="bg-gray-900 px-6">
        <H2>{title}</H2>
        <Paragraph text={text} className="text-center " />
        <XStack className="w-full items-center justify-between pb-3">
          <Button onPress={previousOnPress} size="content">
            <Button.Icon icon="arrowleft" />
            <Button.Text text="Anteior" className="uppercase" />
          </Button>
          <Paragraph text={stage} />
          <Button onPress={nextOnPress} size="content">
            <Button.Text text="Próximo" className="uppercase" />
            <Button.Icon icon="arrowright" />
          </Button>
        </XStack>
      </BottomSheetView>
    </BottomSheetRoot>
  );
});

export { BottonSheetPrayer };
