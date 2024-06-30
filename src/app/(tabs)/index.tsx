import { Conteiner } from "@/components/conteineres/conteiner";
import { Text } from "react-native";

export default function Home() {
  return (
    <Conteiner>
      <Conteiner.Header title="Salve Maria!" subtitle="Seja bem vindo!" />
      <Conteiner.Box>
        <Text>Texto</Text>
      </Conteiner.Box>
    </Conteiner>
  );
}
