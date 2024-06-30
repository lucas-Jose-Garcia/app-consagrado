import { Conteiner } from "@/components/conteineres/conteiner";
import { Text } from "react-native";

export default function Consecration() {
  return (
    <Conteiner>
      <Conteiner.Header icone="crown-outline" title="Consagração" />
      <Conteiner.Box>
        <Text>Texto</Text>
      </Conteiner.Box>
    </Conteiner>
  );
}
