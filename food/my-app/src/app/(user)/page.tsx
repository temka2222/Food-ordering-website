"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { relative } from "path";
import { useUser } from "../(auth)/sign-up/_components/userValueProvider";
import { Categories } from "../_components/Categories";
import { DishesList } from "./_components/DishesList";
import { SelectedFoodProvider } from "./_components/SelectedFoodProvider";

export type CategoryType = {
  categoryName: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
export type FoodsType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: CategoryType;
  createdAt: string;
  updatedAt: string;
};
export default function Home() {
  const { userValues, setUserValues } = useUser();
  const [categoryId, setCategoryId] = useState<string>("");

  return (
    <div className="   flex flex-col bg-[#404040]  pb-22 ">
      <div className="h-142">
        <img className="object-fit" src="/BG.png"></img>
      </div>
      <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
      <SelectedFoodProvider>
      <DishesList categoryId={categoryId} />
       </SelectedFoodProvider>
    </div>
  );
}
