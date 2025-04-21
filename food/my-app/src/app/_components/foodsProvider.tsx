"use client";
import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type FoodsType = {
 foodName:string,
    price:number,
    image:string,
    ingredients:string,
    category:string
};
export type FoodsContextType = {
  foods: FoodsType[];
  setFoods: (value: FoodsType[]) => void;
} & PropsWithChildren;

export const FoodsContext = createContext<FoodsContextType>({} as FoodsContextType);

export const FoodsProvider = ({ children }: PropsWithChildren) => {
  const [foods, setFoods] = useState<FoodsType[]>([

   {
    foodName:"Махны цуглуулга",
    price:50000,
    image:"/hool.jpeg",
    ingredients:"Үхрийн мах ,Хонины мах , Тахианы мах,Төмс,Шинэ ногооны салад ,Мөөг ,Брокколи ,Шарсан төмс ,Саладны навч",
    category:"2-р хоол"
  },
   {
    foodName:"Махны цуглуулга",
    price:50000,
    image:"/hool.jpeg",
    ingredients:"Үхрийн мах ,Хонины мах , Тахианы мах,Төмс,Шинэ ногооны салад ,Мөөг ,Брокколи ,Шарсан төмс ,Саладны навч",
    category:"2-р хоол"
  },
   {
    foodName:"Махны цуглуулга",
    price:50000,
    image:"/hool.jpeg",
    ingredients:"Үхрийн мах ,Хонины мах , Тахианы мах,Төмс,Шинэ ногооны салад ,Мөөг ,Брокколи ,Шарсан төмс ,Саладны навч",
    category:"2-р хоол"
  },
   {
    foodName:"Махны цуглуулга",
    price:50000,
    image:"/hool.jpeg",
    ingredients:"Үхрийн мах ,Хонины мах , Тахианы мах,Төмс,Шинэ ногооны салад ,Мөөг ,Брокколи ,Шарсан төмс ,Саладны навч",
    category:"2-р хоол"
  },
  {
    foodName:"Махны цуглуулга",
    price:50000,
    image:"/hool.jpeg",
    ingredients:"Үхрийн мах ,Хонины мах , Тахианы мах,Төмс,Шинэ ногооны салад ,Мөөг ,Брокколи ,Шарсан төмс ,Саладны навч",
    category:"2-р хоол"
  },
  {
    foodName:"Махны цуглуулга",
    price:50000,
    image:"/hool.jpeg",
    ingredients:"Үхрийн мах ,Хонины мах , Тахианы мах,Төмс,Шинэ ногооны салад ,Мөөг ,Брокколи ,Шарсан төмс ,Саладны навч",
    category:"2-р хоол"
  }

]);
  return (
    <FoodsContext.Provider value={{ foods, setFoods }}>
      {children}
    </FoodsContext.Provider>
  );
};
export const useFoods = () => useContext(FoodsContext);
