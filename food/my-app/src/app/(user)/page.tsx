"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import { relative } from "path";
import { useUser } from "../(auth)/sign-up/_components/userValueProvider";
import { Categories } from "../_components/Categories";
import { FoodCard } from "../_components/productCard";
import { FoodDetail } from "../_components/foodDetail";
import { AllDishes } from "./_components/UserAllDishes";
export type CategoryType = {
  categoryName: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
export type FoodsType = {
  _id:string,
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
 return (
    <div className="   flex flex-col bg-[#404040]  pb-22 ">
      <div className="h-142">
        <img className="object-fit" src="/BG.png"></img>
      </div>
      <Categories />
      <AllDishes/>
     
      {/* {foodId !== 0 && (
        <FoodDetail
          foodName={foods[foodId].foodName}
          price={foods[foodId].price}
          image={foods[foodId].image}
          ingredients={foods[foodId].ingredients}
          setFoodId={setFoodId}
        />
      )} */}
    </div>
  );
}
