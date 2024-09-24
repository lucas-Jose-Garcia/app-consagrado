import { Back } from "../back";
import { XStack } from "../conteineres/stacks";
import { H2 } from "../text/headings";

interface InlineHeaderProps {
  title: string;
}

export function InlineHeader({ title }: InlineHeaderProps) {
  return (
    <XStack className="items-center gap-1">
      <Back />
      <H2 className="w-5/6" numberOfLines={1}>
        {title}
      </H2>
    </XStack>
  );
}
