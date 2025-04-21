"use client";
import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
type FoodsType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

type FoodsOrderType = {
  user: string | "";
  totalPrice: number | null;
  foodOrderItems: FoodsType[];
  status: string;
};

export type FoodsContextType = {
  foods: FoodsType[];
  setFoods: (value: FoodsType[]) => void;
} & PropsWithChildren;

export const FoodsContext = createContext<FoodsContextType>(
  {} as FoodsContextType
);

export const FoodsProvider = ({ children }: PropsWithChildren) => {
  return (
    <FoodsContext.Provider value={{ foods, setFoods }}>
      {children}
    </FoodsContext.Provider>
  );
};
export const useFoods = () => useContext(FoodsContext);
