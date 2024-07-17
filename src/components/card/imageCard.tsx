import { ImageBackground, View, ViewProps } from "react-native";
import { YStack } from "../conteineres/stacks";
import { Paragraph } from "../text/paragraph";
import { cn } from "@/lib/utils";

interface ImageCardProps extends ViewProps {
  uri?: string;
  legend?: string;
  origin?: string;
  full?: boolean;
}

export function ImageCard({
  uri,
  legend,
  origin,
  className,
  full = false,
  ...rest
}: ImageCardProps) {
  return (
    <YStack
      className={cn(
        full ? "h-full" : "h-2/5",
        "w-full rounded-lg overflow-hidden shadow-xl shadow-black",
        className
      )}
      {...rest}
    >
      <ImageBackground className="flex-1" source={{ uri }} resizeMode="cover">
        <YStack
          className="flex-1"
          style={{
            backgroundColor: legend ? "rgba(0, 0, 0, 0.55)" : "transparent",
          }}
        >
          <YStack className="flex-1 m-4">
            {legend && (
              <YStack className="flex-1 items-center justify-end mx-2">
                <Paragraph
                  className="text-white text-center font-quotes text-2xl"
                  text={legend}
                />
                {origin && (
                  <Paragraph
                    className="text-white text-center text-sm"
                    text={origin}
                  />
                )}
              </YStack>
            )}
          </YStack>
        </YStack>
      </ImageBackground>
    </YStack>
  );
}
