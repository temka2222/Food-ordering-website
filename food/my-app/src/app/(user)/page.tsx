"use client";
import { useState } from "react";
import { Categories } from "../_components/Categories";
import { DishesList } from "./_components/DishesList";
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
  const [categoryId, setCategoryId] = useState<string>("");

  return (
    <div className="   flex flex-col bg-[#404040]  pb-22 ">
      <div className="h-142">
        <img className="object-fit" src="/BG.png"></img>
      </div>
      <Categories categoryId={categoryId} setCategoryId={setCategoryId} />

      <DishesList categoryId={categoryId} />
    </div>
  );
}
