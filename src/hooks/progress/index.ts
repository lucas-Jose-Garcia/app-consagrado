import { DataConsecration } from "@/data/consecration";
import { useStorage } from "../storage";
import { Tables } from "../storage/tables";

export interface ProgressProps {
  day: number;
  lastRegister: string | null;
}

const initial: ProgressProps = {
  day: 0,
  lastRegister: null,
};

export function useProgress() {
  const consagracao = useStorage<ProgressProps>(Tables.Consagracao);

  async function increment() {
    const data = await consagracao.get();
    if (data === null) {
      const newValue = initial;
      newValue.day = 1;
      newValue.lastRegister = new Date().toString();
      await consagracao.set(newValue);
    } else {
      const newValue = data;
      newValue.day = data.day + 1 > 33 ? 33 : data.day + 1;
      newValue.lastRegister = new Date().toString();
      await consagracao.set(newValue);
    }
  }

  async function decrement() {
    const data = await consagracao.get();
    if (data === null) {
      await consagracao.set(initial);
    } else {
      data.day = data.day > 0 ? data.day - 1 : 0;
      await consagracao.set(data);
    }
  }

  async function get() {
    const data = await consagracao.get();
    return data ?? initial;
  }

  async function set(day: number) {
    const newValue = (await consagracao.get()) ?? initial;
    newValue.day = day;
    await consagracao.set(newValue);
  }

  async function testes() {
    const newValue = (await consagracao.get()) ?? initial;
    newValue.lastRegister = null;
    await consagracao.set(newValue);
  }

  return { increment, decrement, set, get, testes };
}
