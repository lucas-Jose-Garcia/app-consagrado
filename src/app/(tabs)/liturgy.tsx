import { Conteiner } from "@/components/conteineres/conteiner";
import { Text } from "react-native";

export default function Liturgy() {
  return (
    <Conteiner>
      <Conteiner.Header icone="book-outline" title="Liturgia" />
      <Conteiner.Box>
        <Text>Texto</Text>
      </Conteiner.Box>
    </Conteiner>
  );
}
