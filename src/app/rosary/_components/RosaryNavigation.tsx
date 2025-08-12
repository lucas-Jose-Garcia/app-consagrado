import { XStack } from "@/components/conteineres/stacks";
import { FloatingButton } from "@/components/floatingButton";

interface RosaryNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export function RosaryNavigation({ currentStep, totalSteps, onPreviousStep, onNextStep }: RosaryNavigationProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps;

  return (
    <XStack className="w-full justify-between px-1 py-4">
      <FloatingButton onPress={onPreviousStep} icon="navigate-before" disabled={isFirstStep} />
      <FloatingButton onPress={onNextStep} icon="navigate-next" disabled={isLastStep} />
    </XStack>
  );
}
