import { Conteiner } from "@/components/conteineres/conteiner";
import Cheer from "@/assets/cheer.svg";
import { PrayerCard } from "@/components/card/prayerCard";
import { ListPrayers } from "@/data/prayers";
import { FlatList } from "react-native";

export default function Prayers() {
  return (
    <Conteiner>
      <Conteiner.Header IconSvg={Cheer} title="Orações" />
      <Conteiner.Box>
        <FlatList
          data={ListPrayers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PrayerCard
              title={item.title}
              preview={item.preview}
              uri={item.uri}
              onPress={() => console.log(item.uri)}
            />
          )}
          className="w-full mb-3"
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        />
      </Conteiner.Box>
    </Conteiner>
  );
}
