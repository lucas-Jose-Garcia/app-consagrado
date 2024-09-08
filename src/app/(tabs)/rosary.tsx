import { Conteiner } from "@/components/conteineres/conteiner";
import { FlatList } from "react-native";
import RosaryIcon from "@/assets/rosary.svg";
import { ListRosary } from "@/data/rosary";
import { PrayerCard } from "@/components/card/prayerCard";

export default function Rosary() {
  return (
    <Conteiner>
      <Conteiner.Header IconSvg={RosaryIcon} title="Rosário" />
      <Conteiner.Box>
        <FlatList
          data={ListRosary}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PrayerCard id={item.id} title={item.title} preview={item.preview} uri={item.uri} type="rosary" />
          )}
          className="w-full mb-3"
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        />
      </Conteiner.Box>
    </Conteiner>
  );
}
