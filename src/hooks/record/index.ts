import { DataConsecration } from "@/data/consecration";
import { useEffect, useRef, useState } from "react";
import { useStorage } from "../storage";
import { Tables } from "../storage/tables";
import { SliderRef } from "@/components/slider";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useAppContext } from "@/contexts/appContex";

interface RecordProps {
  initialDate: Date;
  consecrationDate: Date;
  progress: ProgressRecordProps[];
}

interface ProgressRecordProps {
  idConsecration: string;
  days: DayRecordProps[];
}

interface DayRecordProps {
  day: number;
  date: Date;
  completed: boolean;
}

interface RecordSliderProps {}

export function useRecord() {
  const recordStorage = useStorage<RecordProps>(Tables.Record);
  const { currentStep, setCurrentStep } = useAppContext();

  const [record, setRecord] = useState<RecordProps | null>(null);

  const initializeRecord = async (consecrationDate: Date, sliderRef: React.RefObject<SliderRef>): Promise<void> => {
    consecrationDate.setHours(0, 0, 0, 0);

    const initialDate = new Date(consecrationDate);
    initialDate.setDate(initialDate.getDate() - 33);
    initialDate.setHours(0, 0, 0, 0);

    let cumulativeDays = 0;

    const progress = DataConsecration.map((item) => {
      const startDay = cumulativeDays;
      cumulativeDays += item.days;
      return {
        idConsecration: item.id,
        days: createDays(startDay, item.days, initialDate),
      };
    });

    const initialData: RecordProps = {
      initialDate,
      consecrationDate,
      progress,
    };

    console.log("Record initialized:", initialData.consecrationDate, initialData.initialDate);
    setRecord(initialData);
    await recordStorage.set(initialData);
    const idCurrentStep = getCurrentStep(initialData);
    setCurrentStep(idCurrentStep);

    selectCurrentCardById(idCurrentStep, sliderRef);
  };

  const getRecord = async () => {
    const recordData = await recordStorage.get();
    if (recordData) {
      // instância Date
      recordData.initialDate = new Date(recordData.initialDate);
      recordData.consecrationDate = new Date(recordData.consecrationDate);
      recordData.progress = recordData.progress.map((progressItem) => ({
        ...progressItem,
        days: progressItem.days.map((day) => ({
          ...day,
          date: new Date(day.date),
        })),
      }));
    }
    setRecord(recordData);
    return recordData;
  };

  const getCurrentStep = (recordData: RecordProps) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (recordData.initialDate > currentDate || recordData.consecrationDate < currentDate) {
      return null;
    }

    for (const progressItem of recordData.progress) {
      for (const day of progressItem.days) {
        if (day.date.getTime() === currentDate.getTime()) {
          return progressItem.idConsecration;
        }
      }
    }

    return null;
  };

  const updateCurrentStep = (recordData: RecordProps) => {
    const idCurrentStep = getCurrentStep(recordData);
    setCurrentStep(idCurrentStep);
  };

  const selectCurrentCardById = (idCurrentStep: string | null, sliderRef: React.RefObject<SliderRef>) => {
    if (idCurrentStep && sliderRef.current) {
      sliderRef.current.selectCard(idCurrentStep);
    }
  };

  return {
    state: { record, currentStep },
    initializeRecord,
    getRecord,
    getCurrentStep,
    selectCurrentCardById,
    recordStorage,
  };
}

const calculateDays = (date: Date, adicionalDays: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + adicionalDays);
  result.setHours(0, 0, 0, 0);
  return result;
};

const createDays = (startDay: number, numDays: number, initialDate: Date) =>
  Array.from({ length: numDays }, (_, index) => {
    const day = startDay + index + 1;
    const date = calculateDays(initialDate, startDay + index);
    return { day, date, completed: false };
  });
