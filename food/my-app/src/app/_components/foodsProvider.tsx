"use client";
import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { FoodsType } from "../(user)/page";
export type newFoodsType = {
  foodId:string,
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
  updatedAt: Date;
};
export type FoodsContextType = {
  newFood: newFoodsType;
  setNewFood: (value: newFoodsType) => void;
} & PropsWithChildren;

export const NewFoodsContext = createContext<FoodsContextType>(
  {} as FoodsContextType
);

export const FoodsProvider = ({ children }: PropsWithChildren) => {
  const [newFood, setNewFood] = useState<newFoodsType>({
    foodId:"",
    foodName: "",
    price: 0,
    image: "",
    ingredients: "",
    category: "",
    updatedAt: new Date(),
  });
  return (
    <NewFoodsContext.Provider value={{ newFood, setNewFood }}>
      {children}
    </NewFoodsContext.Provider>
  );
};
export const useNewFood = () => useContext(NewFoodsContext);
