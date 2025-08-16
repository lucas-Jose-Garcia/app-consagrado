import { Button } from "@/components/button";
import { Conteiner } from "@/components/conteineres/conteiner";
import { Slider, SliderProps, SliderRef } from "@/components/slider";
import { useAppContext } from "@/contexts/appContex";
import { DataConsecration, DataConsecrationProps } from "@/data/consecration";
import { useRecord } from "@/hooks/record";
import { set } from "date-fns";
import { Href, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

interface DataProps extends DataConsecrationProps {
  value?: number;
  current?: boolean;
}

export default function Consecration() {
  const { sliderRef, currentStep, setCurrentStep } = useAppContext();

  const {
    state: { record },
    getRecord,
    getCurrentStep,
    selectCurrentCardById,
    recordStorage,
  } = useRecord();

  const [isLayoutReady, setIsLayoutReady] = useState(false);

  const initialSlider: SliderProps = {
    id: "1",
    title: "Seja Bem Vindo!",
    description: "Inicie sua jornada escolhendo uma data para a sua consagração.",
    image: "https://www.fatima.pt/img/upload/virgem-peregrina/gallery/D0013740.jpg",
    link: "/selectDate" as Href<string>,
  };

  const SliderDataConsecration: SliderProps[] = [
    initialSlider,
    ...DataConsecration.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: "19 a 20 de agosto",
      description: item.description,
      image: item.image,
      link: `/prayer/${item.id}?type=consecration&current=ativo` as Href<string>,
      progress: {
        current:
          record?.progress.find((p) => p.idConsecration === item.id)?.days.filter((d) => d.completed).length || 0,
        total: item.days,
        suffix: "dias",
      },
    })),
  ];

  useEffect(() => {
    if (isLayoutReady) {
      const update = async () => {
        const dataRecord = await getRecord();
        if (dataRecord) {
          const idCurrentStep = getCurrentStep(dataRecord);
          setCurrentStep(idCurrentStep);
          selectCurrentCardById(idCurrentStep, sliderRef);
        }
      };
      update();
    }
  }, [isLayoutReady]);

  return (
    <Conteiner onLayout={() => setIsLayoutReady(true)}>
      <Conteiner.Header icone="crown-outline" title="Consagração" />
      <Slider ref={sliderRef} data={SliderDataConsecration} activeId={currentStep} />
      <Button text="Reiniciar" onPress={() => recordStorage.deleteItem()} />
    </Conteiner>
  );
}
