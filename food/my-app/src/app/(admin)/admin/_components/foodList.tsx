"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { FoodsType } from "@/app/(user)/page";
import { AdminFoodCard } from "./adminProductCard";
type FoodsListProps = {
  categoryId: string | "";
};
export const FoodList = ({ categoryId }: FoodsListProps) => {
  const [foods, setFoods] = useState<FoodsType[]>([]);

  const [foodId, setFoodId] = useState<number>(0);
  const getFoods = async () => {
    const response = await axios.get(
      `http://localhost:3001/food?categoryId=${categoryId}`
    );
    setFoods(response.data.foods);
  };

  useEffect(() => {
    getFoods();
  }, [categoryId]);

  return (
    <div className="   flex flex-col bg-white pr-22 pl-22 pb-22 mt-6  rounded-xl">
      <div className="flex flex-col gap-[54px] pt-11">
        <p className="text-black font-bold text-xl">
          {foods[0]?.category.categoryName}
        </p>
        <div className=" w-full grid grid-cols-3 gap-9">
          {foods?.map((item, indx) => {
            return (
              <div key={indx}>
                <AdminFoodCard
                  foodName={item.foodName}
                  price={item.price}
                  image={item.image}
                  ingredients={item.ingredients}
                  category={item.category}
                  setFoodId={setFoodId}
                  indx={indx}
                />
              </div>
            );
          })}
        </div>
      </div>

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
};
