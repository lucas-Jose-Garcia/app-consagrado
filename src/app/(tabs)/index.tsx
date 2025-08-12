import { Conteiner } from "@/components/conteineres/conteiner";
import { Slider, SliderProps } from "@/components/slider";
import { DataConsecration, DataConsecrationProps } from "@/data/consecration";

interface DataProps extends DataConsecrationProps {
  value?: number;
  current?: boolean;
}

export default function Consecration() {
  const SliderDataConsecration: SliderProps[] = DataConsecration.map((item) => ({
    title: item.title,
    description: item.description,
    image: item.image,
    id: item.id,
  }));

  return (
    <Conteiner>
      <Conteiner.Header icone="crown-outline" title="Consagração" />
      <Slider data={SliderDataConsecration} />
    </Conteiner>
  );
}
