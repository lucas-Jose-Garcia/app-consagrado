import CircularProgress from "react-native-circular-progress-indicator";
import { Card } from "../card/Card";
import { XStack, YStack } from "../conteineres/stacks";
import { colors } from "@/styles/colors";
import { H2 } from "../text/headings";
import { Paragraph } from "../text/paragraph";
import { Link } from "expo-router";
import { Button } from "../button";
import { getCurrentPrayersIdForDay } from "@/data/consecration";
import { ViewProps } from "react-native";

interface ProgressCardProps {
  value: number;
  maxValue: number;
}

export function ProgressCard({ value, maxValue }: ProgressCardProps) {
  const id = getCurrentPrayersIdForDay(value);
  return (
    <Card>
      <XStack className="items-center gap-3">
        <CircularProgress
          value={value}
          maxValue={maxValue}
          radius={40}
          activeStrokeWidth={8}
          valueSuffix={` / ${maxValue.toString()}`}
          valueSuffixStyle={{ fontSize: 14, justifyContent: "flex-end" }}
          progressValueColor={colors.primary["400"]}
          activeStrokeColor={colors.primary["400"]}
          inActiveStrokeColor={colors.gray["700"]}
        />
        <YStack className="flex-1 h-full ml-1">
          <H2>Sua Jornada</H2>
          <Paragraph
            className="text-sm"
            text={`${
              value == 0 ? "Inicie " : "Continue"
            } sua preparação para a Total Constração a Jesus pelas mãos de Maria`}
          />

          <Link href={`/prayer/${id}?type=consecration&current=ativo`} className="mt-4" asChild>
            <Button text="Orações de hoje" color="primary" />
          </Link>
        </YStack>
      </XStack>
    </Card>
  );
}
