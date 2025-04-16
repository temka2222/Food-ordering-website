"use client";
import { createContext, PropsWithChildren } from "react";

type StepProviderProps = {
  step: number;
  setStep: (value: number) => void;
} & PropsWithChildren;
export const StepContext = createContext();

export const StepProvider = ({
  step,
  setStep,
  children,
}: StepProviderProps) => {
  return (
    <StepContext.Provider value={(step, setStep)}>
      {children}
    </StepContext.Provider>
  );
};
