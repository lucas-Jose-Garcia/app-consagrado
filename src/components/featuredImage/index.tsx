import { YStack } from "../conteineres/stacks";
import { ImageCard } from "../card/imageCard";
import clsx from "clsx";

interface ImageProps {
  uri: string;
  legend?: string;
  className?: string;
}

export function FeaturedImage({ uri, legend, className }: ImageProps) {
  return (
    <YStack className={clsx("w-full h-1/2 px-6 my-5", className)}>
      <ImageCard uri={uri} full legend={legend} />
    </YStack>
  );
}
