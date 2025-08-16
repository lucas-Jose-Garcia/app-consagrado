import React, { createContext, useContext, useState, ReactNode, useRef } from "react";
import { SliderRef } from "@/components/slider";

interface AppContextType {
  currentStep: string | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<string | null>>;
  sliderRef: React.RefObject<SliderRef>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppProviderProps) {
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const sliderRef = useRef<SliderRef>(null);

  return <AppContext.Provider value={{ sliderRef, currentStep, setCurrentStep }}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }
  return context;
}
