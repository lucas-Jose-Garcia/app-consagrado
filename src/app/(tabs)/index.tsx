import { ImageCard } from "@/components/card/imageCard";
import { Conteiner } from "@/components/conteineres/conteiner";
import { Text } from "react-native";

export default function Home() {
  return (
    <Conteiner>
      <Conteiner.Header title="Salve Maria!" subtitle="Seja bem vindo!" />
      <Conteiner.Box>
        <ImageCard
          legend="Rogai por nós santa mãe de Deus, para que sejamos dignos das promessas de Cristo!"
          origin="Um Santo da Igreja"
        />
      </Conteiner.Box>
    </Conteiner>
  );
}
