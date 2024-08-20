interface PrayerConsecrationItemProps {
  prayerId: string;
  type: "simple" | "rosary";
}

export interface DataConsecrationProps {
  id: string;
  title: string;
  description: string;
  explanation: string;
  image: string;
  days: number;
  rosary: boolean;
  prayers: PrayerConsecrationItemProps[];
}

export const DataConsecration: DataConsecrationProps[] = [
  {
    id: "f0f0f7c5-b4d0-4a35-b99e-83edd6026421",
    title: "Doze dias Preliminares",
    description: "Enpregandos em desapegar-se do espírito do mundo.",
    explanation:
      "Para desapego do espírito do mundo e para a aquisição do espírito de Deus, Na qual se medita em nossa vocação à santidade, desprendendo-se de tudo que possa atrapalhar a sermos Santos que possa nos impedir a ir para o céu.",
    image:
      "https://images.pexels.com/photos/1009355/pexels-photo-1009355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    days: 12,
    rosary: false,
    prayers: [
      {
        prayerId: "97d69e75-631c-4118-b745-120a6b1877b2",
        type: "simple",
      },
      {
        prayerId: "7852dd28-ec29-47cb-9846-aabb3e4b2e6b",
        type: "simple",
      },
    ],
  },
  {
    id: "a3277516-ee75-47e7-bf70-4f10e5a3d72b",
    title: "Primeira semana",
    description: "Empregada em adquirir o conhecimento de si mesmo.",
    explanation:
      "Para o conhecimento de si mesmo. Trata se de um período que fazemos um profundo exame de consciência, a partir do que, devemos nos aperfeiçoar, buscando em tudo sermos agradáveis a Deus.",
    image:
      "https://images.pexels.com/photos/805002/pexels-photo-805002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    days: 7,
    rosary: false,
    prayers: [
      {
        prayerId: "80c2d081-6266-4fa1-85ba-24edcb824f94",
        type: "simple",
      },
      {
        prayerId: "1e142184-2555-4a92-9036-5f26660de564",
        type: "simple",
      },
    ],
  },
  {
    id: "fc72bd15-e4c9-4ce4-8146-4ae045b6462e",
    title: "Segunda semana",
    description: "Empregada em adquirir o conhecimento da Santíssima Virgem.",
    explanation:
      "Para o conhecimento da Santíssima Virgem de sua pessoa, de sua missão das graças das quais ela é repleta, de suas sublimes virtudes, de seus privilégios, etc. De forma que conhecendo-a melhor possamos amá-la mais e o honrá-la como ela merece ser honrada.",
    image:
      "https://media.vaticannews.va/media/content/dam-archive/vaticannews/multimedia/2018/10/29/taglio%20di%20luce.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg",
    days: 7,
    rosary: true,
    prayers: [
      {
        prayerId: "80c2d081-6266-4fa1-85ba-24edcb824f94",
        type: "simple",
      },
      {
        prayerId: "7852dd28-ec29-47cb-9846-aabb3e4b2e6b",
        type: "simple",
      },
    ],
  },
  {
    id: "1acff13e-a0f7-47a8-b8f7-72fa0c0ce7c8",
    title: "Terceira semana",
    description: "Empregada em adquirir o conhecimento de Jesus Cristo.",
    explanation:
      "Para o conhecimento de Jesus Cristo nosso fim Último, nosso grande Deus e Senhor. Aqui devemos meditar o mistério da Vinda, da Vida, Paixão, Morte e Glorificação de Jesus Cristo, o filho de Deus. Devemos contemplar a encantadora vida de Jesus, sua pessoa e sua doutrina, para que assim possamos crer com profunda convicção, amá-lo como com amor abrasado de forma a despertar em nós um grande desejo de fazê-lo conhecido amado e adorado por todos.",
    image:
      "https://images.pexels.com/photos/11606781/pexels-photo-11606781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    days: 7,
    rosary: false,
    prayers: [
      {
        prayerId: "80c2d081-6266-4fa1-85ba-24edcb824f94",
        type: "simple",
      },
      {
        prayerId: "7852dd28-ec29-47cb-9846-aabb3e4b2e6b",
        type: "simple",
      },
      {
        prayerId: "3c945e63-6698-4a82-a819-509d8606a5ae",
        type: "simple",
      },
      {
        prayerId: "3b8dcd22-086f-49a7-b170-bd4291819ecb",
        type: "simple",
      },
      {
        prayerId: "2632457c-9cf5-4f05-9e50-eecd9ffb938f",
        type: "simple",
      },
    ],
  },
];

export function getStageConsecration(id: string) {
  return DataConsecration.filter((x) => x.id === id)[0];
}

export function getCurrentPrayersIdForDay(currentDay: number) {
  let accumulatedDays = 0;
  const result = DataConsecration.find((x) => {
    accumulatedDays += x.days;
    return accumulatedDays >= currentDay;
  });

  return result ? result.id : "";
}
