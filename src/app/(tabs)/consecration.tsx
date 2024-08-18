import { PrayerCard } from "@/components/card/prayerCard";
import { Conteiner } from "@/components/conteineres/conteiner";
import { DataConsecration } from "@/data/consecration";
import { ScrollView, Text } from "react-native";

export default function Consecration() {
  return (
    <Conteiner>
      <Conteiner.Header icone="crown-outline" title="Consagração" />
      <Conteiner.Box>
        <ScrollView className="flex-1 w-full">
          {DataConsecration.map((item) => (
            <PrayerCard
              key={item.id}
              id={item.id}
              title={item.title}
              preview={item.description}
              uri={item.image}
              type="consecration"
            />
          ))}
        </ScrollView>
      </Conteiner.Box>
    </Conteiner>
  );
}
