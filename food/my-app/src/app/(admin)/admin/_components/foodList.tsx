"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { FoodsType } from "@/app/(user)/page";
import { AdminFoodCard } from "./adminProductCard";
import { AllFoodList } from "./adminAllFoodsList";

import { ImageIcon, PlusIcon } from "lucide-react";
import { AddNewFood } from "./addNewFood";
export type FoodsListProps = {
  categoryId: string | "";
  getCategory: () => Promise<void>;
};
export const FoodList = ({ categoryId, getCategory }: FoodsListProps) => {
  const [foods, setFoods] = useState<FoodsType[]>([]);

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
  <div className="w-full flex flex-col bg-white p-6 mt-6 rounded-xl">
    <div className="flex flex-col gap-[54px] pt-11">
      <p className="text-black font-bold text-xl">
        {categoryId !== "" ? foods[0]?.category.categoryName : "All Dishes"}
      </p>
      <div className="w-full grid grid-cols-4 gap-9">
        {categoryId !== "" && (
          <AddNewFood categoryId={categoryId} getFoods={getFoods} />
        )}

        {categoryId !== "" &&
          foods?.map((item) => {
            return (
              <div key={item._id} className="border rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <AdminFoodCard
                  name={item.foodName}
                  price={item.price}
                  image={item.image}
                  ingredients={item.ingredients}
                  foodId={item._id}
                  categoryName={item.category.categoryName}
                  getFoods={getFoods}
                  getCategory={getCategory}
                  categoryId={categoryId}
                />
              </div>
            );
          })}
      </div>
    </div>

    {categoryId === "" && <AllFoodList getCategory={getCategory} />}
  </div>
);

};
