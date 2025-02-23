import { Back } from "@/components/back";
import { H2 } from "@/components/text/headings";
import { Paragraph } from "@/components/text/paragraph";
import { XStack } from "@/components/conteineres/stacks";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { colors } from "@/styles/colors";

interface RosaryHeaderProps {
  youtubeId: string;
  title?: string;
  onWatchVideo: (id: string) => void;
  videoId?: string;
}

export function RosaryHeader({ youtubeId, title, onWatchVideo, videoId }: RosaryHeaderProps) {
  return (
    <XStack className="w-full items-center justify-between">
      <Back replace={{ pathname: "/(tabs)/rosary" }} />
      {youtubeId === "" ? (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onWatchVideo(videoId ?? "")}>
          <XStack className="items-center gap-3 mr-4">
            <Paragraph text="assistir" className="uppercase font-bold" />
            <Feather name="youtube" size={24} color={colors.gray[300]} />
          </XStack>
        </TouchableOpacity>
      ) : (
        <H2 className="w-5/6" numberOfLines={1}>
          {title}
        </H2>
      )}
    </XStack>
  );
}
