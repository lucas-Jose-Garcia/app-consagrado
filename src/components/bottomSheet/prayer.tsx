import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { ForwardedRef, forwardRef } from "react";
import { Paragraph } from "../text/paragraph";
import { BottomSheetNative, BottomSheetRoot } from ".";
import { Button } from "../button";
import { XStack, YStack } from "../conteineres/stacks";
import { H2 } from "../text/headings";

interface ButtonProps {
  active: boolean;
  onPress: () => void;
}

interface BottomSheetProps {
  title: string;
  text: string;
  stage: string;
  next: ButtonProps;
  previous: ButtonProps;
}

const BottonSheetPrayer = forwardRef(function BottonSheetPrayer(
  { title, text, stage, previous, next }: BottomSheetProps,
  ref: ForwardedRef<BottomSheetNative>
) {
  return (
    <BottomSheetRoot ref={ref}>
      <BottomSheetView className="bg-gray-900 px-6">
        <H2>{title}</H2>
        <Paragraph text={text} className="text-center " />
        <XStack className="w-full items-center justify-between pb-3">
          <Button
            onPress={() => previous.onPress()}
            size="content"
            disabled={!previous.active}
          >
            <Button.Icon icon="arrowleft" disabled={!previous.active} />
            <Button.Text
              text="Anteior"
              className="uppercase"
              disabled={!previous.active}
            />
          </Button>
          <Paragraph text={stage} />
          <Button
            onPress={() => next.onPress()}
            size="content"
            disabled={!next.active}
          >
            <Button.Text
              text="Próximo"
              className="uppercase"
              disabled={!next.active}
            />
            <Button.Icon icon="arrowright" disabled={!next.active} />
          </Button>
        </XStack>
      </BottomSheetView>
    </BottomSheetRoot>
  );
});

export { BottonSheetPrayer };
