import { ReadingsOptions } from "@/components/liturgy/cardReading";
import axios from "axios";

const liturgy = axios.create({
  baseURL: "https://liturgiadiaria.site",
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

export function useLiturgy() {
  async function getLiturgy() {
    const apiResponse = await liturgy.get("");
    const response = apiResponse.data as ResponseLiturgyProps;
    const listReadings: ReadingsOptions[] = [
      "1ª Leitura",
      "Salmo",
      "2ª Leitura",
      "Evangelho",
    ];

    if (typeof response.segundaLeitura == "string") {
      listReadings.splice(2, 1);
    }

    return { response, listReadings };
  }

  return { getLiturgy };
}
