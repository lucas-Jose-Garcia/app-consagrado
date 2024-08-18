import uuid from "react-native-uuid";

import { PrayersProps, daysOfNumber } from "./global";
import { DataPrayersProps, getPrayer } from "./prayers";

interface RosaryItemProps {
  prayerId: string;
  description: string;
  occurrences: number;
}

interface MysteriesProps {
  order: number;
  title: string;
  image: string;
  offering: string;
  complement: string[];
}

type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface GroupProps {
  id: string;
  title: string;
  description: string;
  image: string;
  days: DayOfWeek[];
  mysteries: MysteriesProps[] | string[];
}

export type InfoGroupProps = Omit<GroupProps, "mysteries">;

export interface GroupMysteriesProps extends InfoGroupProps {
  mysteries: MysteriesProps[];
}

export interface DataRosaryProps {
  initial: RosaryItemProps[];
  contemplations: {
    sequence: RosaryItemProps[];
    groups: GroupProps[];
  };
  finish: RosaryItemProps[];
}

export const DataRosary: DataRosaryProps = {
  initial: [
    {
      prayerId: "72ee9cd3-fb7e-49fe-9cd9-631b740cecc3",
      description: "Sinal da Cruz",
      occurrences: 1,
    },
    {
      prayerId: "af16bd5a-72ab-42d6-84e8-f4b5ba8384e4",
      description: "Oferecimento",
      occurrences: 1,
    },
    {
      prayerId: "beaf4646-0571-437d-a049-80ccebc7d7cc",
      description: "Creio",
      occurrences: 1,
    },
    {
      prayerId: "640d8601-b6d9-426a-8721-9fe2899254be",
      description: "Pai Nosso",
      occurrences: 1,
    },
    {
      prayerId: "3b166847-28de-4dd8-9ad6-8d86b319ccda",
      description: "Ave Maria",
      occurrences: 3,
    },
    {
      prayerId: "c0c364de-d922-4580-8981-9964df57cbfe",
      description: "Glória",
      occurrences: 1,
    },
  ],
  contemplations: {
    sequence: [
      {
        prayerId: "640d8601-b6d9-426a-8721-9fe2899254be",
        description: "Pai Nosso",
        occurrences: 1,
      },
      {
        prayerId: "3b166847-28de-4dd8-9ad6-8d86b319ccda",
        description: "Ave Maria",
        occurrences: 10,
      },
      {
        prayerId: "c0c364de-d922-4580-8981-9964df57cbfe",
        description: "Glória",
        occurrences: 1,
      },
    ],
    groups: [
      {
        id: "0e0e4239-63bf-4ca0-b603-efab30215ad6",
        title: "Rosário",
        description:
          "Contemplamos todos os mistérios passando pelo nascimento, vida, morte e ressureição de Nosso Senhor Jesus Cristo.",
        image: "https://images.a12.com/source/files/c/315546/Maos_rezando_o_terco-790718_1481-989-0-0.jpg",
        days: [],
        mysteries: [
          "7681f562-93bc-4631-a08f-85e729602c26",
          "6372846a-daa8-46bc-96d4-04f486f2ae1d",
          "91471e0f-5d6e-4038-9e66-7b7d12465e38",
          "a4dd9d6b-30ec-4a70-85a3-b42eeddf4934",
        ],
      },
      {
        id: "7681f562-93bc-4631-a08f-85e729602c26",
        title: "Mistérios Gozosos",
        description:
          "Nos Mistérios Gozosos contemplamos a alegria que emana da Encarnação de Jesus. Maria leva-nos a aprender o segredo da alegria cristã, lembrando-nos que o cristianismo é, antes de mais, evangelion, “boa nova”, que tem o seu centro, antes, o seu mesmo conteúdo, na pessoa de Cristo, o Verbo feito carne, único Salvador do mundo (São João Paulo II, 2002).",
        image:
          "https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2021/03/formacao_1600x1200-anunciacao-do-senhor-o-sim-que-salvou-a-humanidade.png",
        days: [1, 6],
        mysteries: [
          {
            order: 1,
            title: "Anunciação a Maria",
            image:
              "https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2021/03/formacao_1600x1200-anunciacao-do-senhor-o-sim-que-salvou-a-humanidade.png",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra a vossa Encarnação no seio de Maria; e vos pedimos, por esse mistério, e por sua intercessão uma profunda humildade. Assim seja.",
            complement: [""],
          },
          {
            order: 2,
            title: "Visitação de Nossa Senhora a sua prima Isabel",
            image: "https://gaudiumpress.org/wp-content/uploads/2021/05/visita-de-nossa-senhora-a-santa-isabel.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra da visitação de vossa santa Mãe à sua prima santa Isabel e da santificação de São João Batista; e vos pedimos, por esse mistério e pela intercessão de vossa Mãe Santíssima, a caridade para com o nosso próximo. Assim seja.",
            complement: [""],
          },
          {
            order: 3,
            title: "Nascimento de Jesus",
            image: "https://www.bbc.co.uk/worldservice/assets/images/2010/12/20/101220132849_murilloadoracao.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra ao vosso nascimento no estábulo de Belém; e vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, o desapego dos bens terrenos e ao amor a pobreza. Assim seja.",
            complement: [""],
          },
          {
            order: 4,
            title: "Apresentação do Menino Jesus no Templo",
            image: "https://r2.padrepauloricardo.org/ows2olsi32ufoq956bjoe7pmi5gt",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra a vossa apresentação ao templo, e da purificação de Maria; e vos pedimos, por este mistério e por sua intercessão, uma grande pureza de corpo de alma. Assim seja.",
            complement: [""],
          },
          {
            order: 5,
            title: "Perda e encontro do Menino Jesus no Templo",
            image: "https://i.pinimg.com/236x/d4/9f/7a/d49f7aee6ceb9e9f6da98e17d7799355.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra ao vosso reencontro por Maria; e vos pedimos, por este mistério; e por sua intercessão, a verdadeira sabedoria. Assim seja.",
            complement: [""],
          },
        ],
      },
      {
        id: "6372846a-daa8-46bc-96d4-04f486f2ae1d",
        title: "Mistérios Luminosos",
        description:
          "No Mistérios Luminosos contemplamos a vida pública de Jesus. Cada um destes mistérios é revelação do Reino divino já personificado em Jesus que se revela como a 'luz do mundo' (Jo 8, 12) por isso são chamados de 'luminosos' (São João Paulo II, 2002)",
        image:
          "https://www.santateresinhahigienopolis.org.br/images/uploads/posts/1608209859batismo%20do%20senhor%203.jpg",
        days: [4],
        mysteries: [
          {
            order: 1,
            title: "Batismo de Jesus no rio Jordão",
            image: "https://comunidadeoasis.org.br/wp-content/uploads/2021/01/Esplendor-da-Verdade263.png",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra de vosso batismo no rio Jordão; e vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, o comprometimento com vosso caminho. Assim seja.",
            complement: [""],
          },
          {
            order: 2,
            title: "Auto-revelação de Jesus nas Bodas de Caná",
            image: "https://i.pinimg.com/236x/7a/d2/e2/7ad2e2a211f7344e695ea2d1de60bc5e.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra de vossa auto-revelação nas Bodas de Caná; e vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, a abertura de nosso coração à fé. Assim seja.",
            complement: ["FALAR DOS DICIPULOS QUE SE ABREM À FÉ"],
          },
          {
            order: 3,
            title: "Anúncio do Reino de Deus e o convite à conversão",
            image:
              "https://santhatela.com.br/wp-content/uploads/2020/03/carl-heinrich-bloch-o-sermao-da-montanha-d.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra de vosso anúncio do Reino de Deus com seu convite à conversão; e vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, a verdadeira conversão. Assim seja.",
            complement: [""],
          },
          {
            order: 4,
            title: "Transfiguração de Jesus",
            image:
              "https://reginafidei.com.br/wp-content/uploads/2021/08/1567677980065220-8.Luca-Giordano-1020x740.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra de vossa santa Transfiguração; e vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, a disposição de viver tudo com Cristo. Assim seja.",
            complement: [""],
          },
          {
            order: 5,
            title: "Instituição da Eucaristia",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/%C3%9Altima_Cena_-_Juan_de_Juanes.jpg/1280px-%C3%9Altima_Cena_-_Juan_de_Juanes.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra de vossa Instituição da Eucaristia na última ceia; e vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, s graça de receber Cristo como verdadeiro alimento. Assim seja.",
            complement: [""],
          },
        ],
      },
      {
        id: "91471e0f-5d6e-4038-9e66-7b7d12465e38",
        title: "Mistérios Dolorozos",
        description:
          "No Mistérios Dolorozos contemplamos os momentos da Paixão de nosso Senhor Jesus Cristo. Esses mistérios revelam o ápice da revelação do amor de Deus e a fonte da nossa salvação (São João Paulo II, 2002).",
        image:
          "https://s3.sa-east-1.amazonaws.com/arquivos.padrepauloricardo.org/uploads/episodio/frame/4051/large_5-a-oracao-de-jesus-no-horto-e-o-suor-de-sangue-frame.jpg",
        days: [2, 5],
        mysteries: [
          {
            order: 1,
            title: "Agonia de Jesus no Horto",
            image:
              "https://s3.sa-east-1.amazonaws.com/arquivos.padrepauloricardo.org/uploads/episodio/frame/4051/large_5-a-oracao-de-jesus-no-horto-e-o-suor-de-sangue-frame.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra a vossa agonia mortal no Jardim das Oliveiras; e vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, a contrição de nossos pecados. Assim seja.",
            complement: [""],
          },
          {
            order: 2,
            title: "Flagelação de Jesus",
            image:
              "https://www.meisterdrucke.pt/kunstwerke/1260px/Peter_Paul_Rubens_-_The_Flagellation_of_Christ_1617_-_%28MeisterDrucke-745405%29.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra a vossa sangrenta flagelação; e vos pedimos, por este mistério e pela intercessão de vossa Mãe santíssima, a mortificação de nossos sentidos. Assim seja.",
            complement: [""],
          },
          {
            order: 3,
            title: "Coroação de Espinhos",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/The_Crowning_with_Thorns-Caravaggio_%281602%29.jpg/2560px-The_Crowning_with_Thorns-Caravaggio_%281602%29.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra de vossa coroação de espinhos; e vos pedimos por este mistério e pela intercessão de vossa Mãe Santíssima, o desprezo do mundo. Assim seja.",
            complement: [""],
          },
          {
            order: 4,
            title: "Jesus carregando a cruz no caminho do Calvário",
            image: "https://s3.amazonaws.com/ahe.images/1/Destaque-home43.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra do carregamento da Cruz; e vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, a paciência em todas as nossas cruzes. Assim seja.",
            complement: [""],
          },
          {
            order: 5,
            title: "Crucifixão e morte de Jesus",
            image:
              "https://r2.padrepauloricardo.org/uploads/aula/frame/1829/16-quem-nos-separara-do-amor-de-cristo-frame.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra a vossa crucificação e morte ignominiosa sobre o calvário; e vos pedimos por este mistério e pela intercessão de vossa Mãe Santíssima, a conversão dos pecadores, a perseverança dos justos e o alívio das almas do purgatório. Assim seja.",
            complement: [""],
          },
        ],
      },
      {
        id: "a4dd9d6b-30ec-4a70-85a3-b42eeddf4934",
        title: "Mistérios Gloriosos",
        description:
          "No Mistérios Gloriosos contemplamos a Ressureição de Jesus. Estes mistérios convidam o fiel a ultrapassar as trevas da Paixão  para fixar o olhar na glória de Cristo com a Ressurreição e a Ascensão (São João Paulo II, 2002).",
        image: "https://comunidadeoasis.org.br/wp-content/uploads/2021/04/Esplendor-da-Verdade370.png",
        days: [0, 3],
        mysteries: [
          {
            order: 1,
            title: "Ressurreição de Jesus",
            image: "https://comunidadeoasis.org.br/wp-content/uploads/2021/04/Esplendor-da-Verdade370.png",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra a vossa ressurreição gloriosa; e vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, o amor a Deus e o fervor ao vosso serviço. Assim seja.",
            complement: [""],
          },
          {
            order: 2,
            title: "Ascensão de Jesus ao Céu",
            image: "https://cruzartesacra.com.br/wp-content/uploads/2020/05/ascensao-de-nosso-senhor.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra a vossa triunfante ascensão; e vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, um ardente desejo do céu, nossa cara pátria. Assim seja.",
            complement: [""],
          },
          {
            order: 3,
            title: "Vinda do Espírito Santo sobre os Apóstolos",
            image: "https://cruzartesacra.com.br/wp-content/uploads/2017/06/826479.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra do mistério de Pentecostes; e vos pedimos, por este mistério e pela intercessão de vossa Mãe Santíssima, a descida do Espírito Santo em nossas almas. Assim seja.",
            complement: [""],
          },
          {
            order: 4,
            title: "Assunção de Maria",
            image: "https://i.pinimg.com/originals/bb/e0/61/bbe061f076bb1a6b98e895cb4153adb7.jpg",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra da ressurreição e triunfal assunção de vossa Mãe ao céu; e vos pedimos, por este mistério e por sua intercessão, uma terna devoção a tão boa mãe. Assim seja.",
            complement: [""],
          },
          {
            order: 5,
            title: "Coroação de Maria no Céu",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWdhKlEyzXSOZAvC5JIs1czI6sHv90PciR1sxkd9WyPQor3s03WOVqkJ_8DTghKMqEoLY&usqp=CAU",
            offering:
              "Nós vos oferecemos, Senhor Jesus, esta dezena, em honra da coroação gloriosa de vossa Mãe Santíssima no céu; e vos pedimos, por este mistério e por sua intercessão, a perseverança na graça e a coroa da glória. Assim seja.",
            complement: [""],
          },
        ],
      },
    ],
  },
  finish: [
    {
      prayerId: "bc995157-0185-483b-9df5-aaae2dfaf74b",
      description: "Agradecimento",
      occurrences: 1,
    },
    {
      prayerId: "af5c6cda-b271-4105-933c-cd5a71d196ae",
      description: "Salve Rainha",
      occurrences: 1,
    },
    {
      prayerId: "72ee9cd3-fb7e-49fe-9cd9-631b740cecc3",
      description: "Sinal da Cruz",
      occurrences: 1,
    },
  ],
};

export const DataRosaryCards = DataRosary.contemplations.groups;

export const ListRosary: PrayersProps[] = DataRosary.contemplations.groups.map((x) => {
  return {
    id: x.id,
    title: x.title,
    preview: getPreview(x.days),
    uri: x.image,
  };
});

function getPreview(days: (0 | 1 | 2 | 3 | 4 | 5 | 6)[]) {
  if (days.length === 0) {
    return "Qualquer dia";
  }

  if (days.length === 1) {
    return daysOfNumber[days[0]];
  }

  const activeDays = days.map((day) => daysOfNumber[day]);

  if (activeDays.length === 2) {
    return activeDays.join(" e ");
  }

  const lastDay = activeDays.pop();
  return `${activeDays.join(", ")} e ${lastDay}`;
}

export function getRosary(id: string): GroupMysteriesProps {
  const data = DataRosary.contemplations.groups.filter((x) => x.id === id)[0];

  if (typeof data.mysteries[0] === "string") {
    const updatedMysteries = (data.mysteries as string[]).flatMap(
      (x) => DataRosary.contemplations.groups.filter((y) => x === y.id)[0].mysteries as MysteriesProps[]
    );

    data.mysteries = updatedMysteries;
  }

  data.mysteries.forEach((mystery, index) => {
    if (typeof mystery !== "string") {
      mystery.order = index + 1;
    }
  });

  return data as GroupMysteriesProps;
}

export interface RosaryPrayersProps extends DataPrayersProps {
  order: number;
  description: string;
  occurrences: number;
  prayed: number;
  complement: string[];
}

function converterToPrayerType(array: RosaryItemProps[]): RosaryPrayersProps[] {
  return array.map((x) => {
    const prayer = getPrayer(x.prayerId);
    const result: RosaryPrayersProps = {
      ...prayer,
      order: 0,
      description: x.description,
      occurrences: x.occurrences,
      prayed: 1,
      complement: [""],
    };
    return result;
  });
}

const findDuplicates = (array: string[]): string[] => {
  const seen: Set<string> = new Set();
  const duplicates: Set<string> = new Set();
  array.forEach((item: string) => {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  });
  return Array.from(duplicates);
};

export function getPrayersRosary(id: string): RosaryPrayersProps[] {
  const initial = converterToPrayerType(DataRosary.initial);
  const finish = converterToPrayerType(DataRosary.finish);
  const sequence = converterToPrayerType(DataRosary.contemplations.sequence);

  const rosary = getRosary(id);

  let result: RosaryPrayersProps[] = initial;

  rosary.mysteries.forEach((mystery) => {
    result.push({
      id: String(mystery.order),
      title: mystery.title,
      image: mystery.image,
      type: "Mystery",
      visible: true,
      content: {
        "pt-br": {
          text: [mystery.offering],
        },
      },
      order: mystery.order,
      description: mystery.title,
      occurrences: 1,
      prayed: 1,
      complement: mystery.complement,
    });
    const newSequence = sequence.map((x) => ({
      ...x,
      id: String(uuid.v4()),
      image: mystery.image,
    }));
    result = [...result, ...newSequence];
  });

  result = [...result, ...finish];

  const listDuplicateId = findDuplicates(result.map((x) => x.id));

  if (listDuplicateId.length > 0) {
    result = result.map((x) => {
      if (!listDuplicateId.includes(x.id)) return x;
      return {
        ...x,
        id: String(uuid.v4()),
      };
    });
  }

  return result;
}

export function getGroupInfo(id: string): InfoGroupProps {
  const data = DataRosary.contemplations.groups.filter((x) => x.id === id)[0];

  const result: InfoGroupProps = {
    id: data.id,
    title: data.title,
    description: data.description,
    image: data.image,
    days: data.days,
  };

  return result;
}

export function currentRosary(): PrayersProps {
  const day: DayOfWeek = new Date().getDay() as DayOfWeek;
  const item = DataRosary.contemplations.groups.filter((x) => x.days.includes(day))[0];
  return ListRosary.filter((x) => x.id === item.id)[0];
}
