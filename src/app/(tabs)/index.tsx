import { Conteiner } from "@/components/conteineres/conteiner";
import { Slider, SliderProps } from "@/components/slider";
import { DataConsecration, DataConsecrationProps } from "@/data/consecration";
import { Href } from "expo-router";

interface DataProps extends DataConsecrationProps {
  value?: number;
  current?: boolean;
}

export default function Consecration() {
  const initial: SliderProps = {
    id: "1",
    title: "Seja Bem Vindo!",
    description: "Inicie sua jornada escolhendo uma data para a sua consagração.",
    image: "https://www.fatima.pt/img/upload/virgem-peregrina/gallery/D0013740.jpg",
    link: "/selectDate" as Href<string>,
  };

  const SliderDataConsecration: SliderProps[] = [
    initial,
    ...DataConsecration.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.image,
      link: `/prayer/${item.id}?type=consecration&current=ativo` as Href<string>,
    })),
  ];

  return (
    <Conteiner>
      <Conteiner.Header icone="crown-outline" title="Consagração" />
      <Slider data={SliderDataConsecration} />
    </Conteiner>
  );
}
