import { Conteiner } from "@/components/conteineres/conteiner";
import { Text } from "react-native";
import Cheer from "@/assets/cheer.svg";

export default function Prayers() {
  return (
    <Conteiner>
      <Conteiner.Header IconSvg={Cheer} title="Orações" />
      <Conteiner.Box>
        <Text>Texto</Text>
      </Conteiner.Box>
    </Conteiner>
  );
}
