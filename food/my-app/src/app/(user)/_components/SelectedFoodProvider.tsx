"use client";

import { PropsWithChildren, useContext, useState } from "react";
import { createContext } from "react";
export type SelectedFoodType={
    foodId:string;
    qty:number
  }
type SelectedFoodContextType = {
 selectedFood:SelectedFoodType[],
 setSelectedFood:React.Dispatch<React.SetStateAction<SelectedFoodType[]>>
} & PropsWithChildren;

export const SelectedFoodContext = createContext<SelectedFoodContextType>(
  {} as SelectedFoodContextType
);

export const SelectedFoodProvider = ({ children }: PropsWithChildren) => {
  const [selectedFood, setSelectedFood] = useState<SelectedFoodType[]>([]);
  return (
    <SelectedFoodContext.Provider value={{ selectedFood, setSelectedFood }}>
      {children}
    </SelectedFoodContext.Provider>
  );
};
export const useSelecFood = () => useContext(SelectedFoodContext);
