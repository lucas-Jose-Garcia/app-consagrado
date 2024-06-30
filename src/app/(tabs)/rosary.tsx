import { Conteiner } from "@/components/conteineres/conteiner";
import { Text } from "react-native";
import RosaryIcon from "@/assets/rosary.svg";

export default function Rosary() {
  return (
    <Conteiner>
      <Conteiner.Header IconSvg={RosaryIcon} title="Rosário" />
      <Conteiner.Box>
        <Text>Texto</Text>
      </Conteiner.Box>
    </Conteiner>
  );
}
