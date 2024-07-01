import { ImageBackground, View, ViewProps } from "react-native";
import { YStack } from "../conteineres/stacks";
import { Paragraph } from "../text/paragraph";
import { cn } from "@/lib/utils";

const sourse = {
  uri: "https://images.a12.com/source/files/c/289314/Imagem_de_Nossa_Senhora_Aparecida_Novena_da_Tarde_2022_-_6_dia-549163_1280-853-0-0.jpg",
};

interface ImageCardProps extends ViewProps {
  legend?: string;
  origin?: string;
}

export function ImageCard({
  legend,
  origin,
  className,
  ...rest
}: ImageCardProps) {
  return (
    <YStack
      className={cn(
        "h-2/5 w-full rounded-lg overflow-hidden shadow-xl shadow-black",
        className
      )}
      {...rest}
    >
      <ImageBackground className="flex-1" source={sourse} resizeMode="cover">
        <YStack
          className="flex-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
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
