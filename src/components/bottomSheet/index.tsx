import BottomSheetNative, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Paragraph } from "../text/paragraph";
import { ForwardedRef, ReactNode, forwardRef, useCallback } from "react";
import { colors } from "@/styles/colors";

interface BottomSheetProps {
  text: string;
  children?: ReactNode;
}

interface BottomSheetRootProps {
  children?: ReactNode;
}

const BottomSheet = forwardRef(function BottomSheet(
  { text }: BottomSheetProps,
  ref: ForwardedRef<BottomSheetNative>
) {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={2}
        opacity={0.6}
      />
    ),
    []
  );
  return (
    <BottomSheetNative
      ref={ref}
      index={-1}
      snapPoints={["50%"]}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors.gray[900] }}
      handleIndicatorStyle={{ backgroundColor: colors.gray[300] }}
    >
      <BottomSheetView className="flex-1 items-center bg-gray-900">
        <Paragraph text={text} className="text-center px-6" />
      </BottomSheetView>
    </BottomSheetNative>
  );
});

const BottomSheetRoot = forwardRef(function BottomSheet(
  { children }: BottomSheetRootProps,
  ref: ForwardedRef<BottomSheetNative>
) {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={2}
        opacity={0.6}
      />
    ),
    []
  );
  return (
    <BottomSheetNative
      ref={ref}
      index={-1}
      enablePanDownToClose
      enableDynamicSizing
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors.gray[900] }}
      handleIndicatorStyle={{ backgroundColor: colors.gray[300] }}
    >
      {children}
    </BottomSheetNative>
  );
});

export { BottomSheet, BottomSheetRoot, BottomSheetNative };
