import { DataConsecration } from "@/data/consecration";
import { useStorage } from "../storage";
import { Tables } from "../storage/tables";

interface ProgressProps {
  day: number;
}

interface DataProgressProps {
  [key: string]: {
    current: number;
    limit: number;
  };
}

const initial: ProgressProps = {
  day: 0,
};

export function useProgress() {
  const consagracao = useStorage<ProgressProps>(Tables.Consagracao);

  async function increment() {
    const data = await consagracao.get();
    if (data === null) {
      const newValue = initial;
      newValue.day = 1;
      await consagracao.set(newValue);
    } else {
      data.day = data.day + 1;
    }
  }

  async function decrement() {
    const data = await consagracao.get();
    if (data === null) {
      await consagracao.set(initial);
    } else {
      data.day = data.day > 0 ? data.day - 1 : 0;
    }
  }

  async function get() {
    const data = await consagracao.get();

    const progress: DataProgressProps = {};

    DataConsecration.forEach((x) => {
      progress[x.id] = {
        current: 0,
        limit: x.days,
      };
    });

    if (data && data.day > 0) {
      let currentLimit = 0;
      Object.keys(progress).forEach((id) => {
        currentLimit = currentLimit + progress[id].limit;
        if (data.day >= currentLimit) {
          progress[id].current = progress[id].limit;
        } else {
          const value = data.day - (currentLimit - progress[id].limit);
          progress[id].current = value < 0 ? 0 : value;
        }
      });
    }
  }

  return { increment, decrement };
}
