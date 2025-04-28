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
};
export const FoodList = ({ categoryId }: FoodsListProps) => {
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
    <div className="   flex flex-col bg-white pr-22 pl-22 pb-22 mt-6 rounded-xl">
      <div className="flex flex-col gap-[54px] pt-11">
        <p className="text-black font-bold text-xl">
          {categoryId !== "" ? foods[0]?.category.categoryName : "All Dishes"}
        </p>
        <div className=" w-full grid grid-cols-4 gap-9">
          {categoryId !== "" && <AddNewFood categoryId={categoryId} />}
          {categoryId !== "" &&
            foods?.map((item, indx) => {
              return (
                <div key={indx} className="border-solid border rounded-xl">
                  <AdminFoodCard
                    foodName={item.foodName}
                    price={item.price}
                    image={item.image}
                    ingredients={item.ingredients}
                    category={item.category}
                   foodId={item._id}
                    indx={indx}
                    categoryName={item.category.categoryName}
                  />
                </div>
              );
            })}
        </div>
      </div>
      {categoryId === "" && <AllFoodList />}
    </div>
  );
};
