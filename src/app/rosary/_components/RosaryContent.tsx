import { View } from "react-native";
import { Card } from "@/components/card/Card";
import { RosaryPrayerCard } from "@/components/card/RosaryPrayerCard";
import { Conteiner } from "@/components/conteineres/conteiner";
import { H2 } from "@/components/text/headings";
import { Paragraph } from "@/components/text/paragraph";
import { RosaryStepsProps } from "@/data/rosary";
import { RosaryNavigation } from "./RosaryNavigation";

interface RosaryContentProps {
  rosaryStep: RosaryStepsProps;
  currentStep: number;
  totalSteps: number;
  onNavigateToStep: (step: number) => void;
}

export function RosaryContent({ rosaryStep, currentStep, totalSteps, onNavigateToStep }: RosaryContentProps) {
  const hasOffering = rosaryStep.offering && rosaryStep.offering.length > 0;

  const handlePreviousStep = () => onNavigateToStep(currentStep - 1);
  const handleNextStep = () => onNavigateToStep(currentStep + 1);

  return (
    <Conteiner.Box>
      {hasOffering && (
        <Card>
          <H2>Oferecimento</H2>
          <View className="space-y-2">
            <Paragraph text={rosaryStep.offering} />
          </View>
        </Card>
      )}

      {rosaryStep.prayers.map((prayer) => (
        <RosaryPrayerCard key={prayer.prayerId} prayerId={prayer.prayerId} occurrences={prayer.occurrences} />
      ))}

      <RosaryNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPreviousStep={handlePreviousStep}
        onNextStep={handleNextStep}
      />
    </Conteiner.Box>
  );
}
