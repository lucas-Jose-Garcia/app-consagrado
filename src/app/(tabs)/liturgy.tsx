import { Conteiner } from "@/components/conteineres/conteiner";
import { useLiturgy } from "@/hooks/liturgy";
import { Button, Text } from "react-native";

export default function Liturgy() {
  const { getLiturgy } = useLiturgy();

  return (
    <Conteiner>
      <Conteiner.Header icone="book-outline" title="Liturgia" />
      <Conteiner.Box>
        <Button title="Testar" onPress={getLiturgy} />
      </Conteiner.Box>
    </Conteiner>
  );
}
