import { ReadingsOptions } from "@/components/liturgy/cardReading";
import axios from "axios";

const liturgy = axios.create({
  baseURL: "https://liturgiadiaria.site/",
});

export interface ItemLiturgyProps {
  referencia: string;
  titulo?: string;
  refrao?: string;
  texto: string;
}

export interface ResponseLiturgyProps {
  data: string;
  liturgia: string;
  cor: string;
  dia: string;
  oferendas: string;
  comunhao: string;
  primeiraLeitura: ItemLiturgyProps;
  segundaLeitura: ItemLiturgyProps | string;
  salmo: ItemLiturgyProps;
  evangelho: ItemLiturgyProps;
}

export interface SectionReadingProps {
  title: ReadingsOptions;
  data: ItemLiturgyProps;
}

export function useLiturgy() {
  async function getLiturgy() {
    const apiResponse = await liturgy.get("");
    const response = apiResponse.data as ResponseLiturgyProps;
    const sectionReading: SectionReadingProps[] = [];

    sectionReading.push({ title: "1ª Leitura", data: response.primeiraLeitura });
    sectionReading.push({ title: "Salmo", data: response.salmo });
    if (typeof response.segundaLeitura !== "string") {
      sectionReading.push({ title: "2ª Leitura", data: response.segundaLeitura });
    }
    sectionReading.push({ title: "Evangelho", data: response.evangelho });

    const labels: ReadingsOptions[] =
      sectionReading.length === 4
        ? ["1ª Leitura", "Salmo", "2ª Leitura", "Evangelho"]
        : ["1ª Leitura", "Salmo", "Evangelho"];

    return { response, sectionReading, labels };
  }

  return { getLiturgy };
}
