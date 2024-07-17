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
          uri="https://images.a12.com/source/files/c/289314/Imagem_de_Nossa_Senhora_Aparecida_Novena_da_Tarde_2022_-_6_dia-549163_1280-853-0-0.jpg"
        />
      </Conteiner.Box>
    </Conteiner>
  );
}
