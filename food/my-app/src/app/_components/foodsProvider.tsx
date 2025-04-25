"use client";
import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { FoodsType } from "../(user)/page";

export type FoodsContextType = {
  newFood: FoodsType;
  setNewFood: (value: FoodsType) => void;
} & PropsWithChildren;

export const NewFoodsContext = createContext<FoodsContextType>(
  {} as FoodsContextType
);

export const FoodsProvider = ({ children }: PropsWithChildren) => {
  const [newFood, setNewFood] = useState<FoodsType>({
    foodName: "",
    price: 0,
    image: "",
    ingredients: "",
    category: {
      categoryName: "",
      _id: "",
      createdAt: "",
      updatedAt: "",
    },
    createdAt: "",
    updatedAt: "",
  });
  return (
    <NewFoodsContext.Provider value={{ newFood, setNewFood }}>
      {children}
    </NewFoodsContext.Provider>
  );
};
export const useNewFood = () => useContext(NewFoodsContext);
