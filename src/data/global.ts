import { DataPrayers } from "./prayers";
import { DataRosary } from "./rosary";

export interface PrayersProps {
  id: string;
  uri: string;
  title: string;
  preview: string;
}

export const daysOfNumber: { [key: number]: string } = {
  0: "Domingo",
  1: "Segunda-Feira",
  2: "Terça-Feira",
  3: "Quarta-Feira",
  4: "Quinta-Feira",
  5: "Sexta-Feira",
  6: "Sábado",
};

export function getDayofWeek(date: Date) {
  const day = date.getDay();

  if (day in daysOfNumber) {
    return daysOfNumber[day];
  }

  return -1;
}
