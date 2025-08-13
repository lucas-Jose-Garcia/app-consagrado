import { FlatList, View } from "react-native";
import { Conteiner } from "@/components/conteineres/conteiner";
import { InlineHeader } from "@/components/header/inlineHeader";
import { ItemDateConsecration } from "@/components/itemDateConsecration";
import { getConsecrationDatesByProximity } from "@/data/dates";

export default function SelectDate() {
  const consecrationDates = getConsecrationDatesByProximity();
  return (
    <Conteiner>
      <InlineHeader title={"Selecione uma data"} />
      <FlatList
        data={consecrationDates}
        renderItem={({ item }) => <ItemDateConsecration item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </Conteiner>
  );
}
