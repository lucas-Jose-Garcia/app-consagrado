import { PrayerText } from "../prayerText";
import { DataPrayersProps } from "@/data/prayers";
import { TabBar } from "../TabBar";

interface IndividualPrayer {
  prayer: DataPrayersProps;
  totleYoutube: (id: string) => void;
}

export function IndividualPrayer({ prayer, totleYoutube }: IndividualPrayer) {
  return prayer && prayer.content.la ? (
    <TabBar
      itens={[
        {
          key: "Português",
          renderItem: (
            <PrayerText
              content={prayer?.content["pt-br"]}
              setYoutube={() => totleYoutube(prayer?.content["pt-br"].media?.youtubeId ?? "")}
            />
          ),
        },
        {
          key: "Latim",
          renderItem: (
            <PrayerText
              content={prayer?.content["la"]}
              translate={prayer?.content["pt-br"]}
              setYoutube={() => totleYoutube(prayer?.content["la"]?.media?.youtubeId ?? "")}
            />
          ),
        },
      ]}
    />
  ) : (
    <PrayerText
      content={prayer?.content["pt-br"]}
      setYoutube={() => totleYoutube(prayer?.content["pt-br"].media?.youtubeId ?? "")}
    />
  );
}
