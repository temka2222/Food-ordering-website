import { api } from "@/app/axios";
import { FoodsType } from "../page";
import { SelectFood } from "./SelectFood";

import { useEffect, useState } from "react";

type FoodcardType = {
  foodId: string;
};

export function formatWithApostrophe(number: number): string {
  const numStr = number.toString();
  const formattedStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return formattedStr;
}
export const FoodCard = ({ foodId }: FoodcardType) => {
  const [food, setFood] = useState<FoodsType>();
  const getFood = async () => {
    const response = await api.get(`/food/${foodId}`);
    setFood(response.data.food);
  };

  useEffect(() => {
    getFood();
  }, [foodId]);
  return (
    food && (
      <div className="relative flex flex-col bg-white rounded-2xl gap-5 p-4 shadow-lg shadow-stone-800">
        <div className="flex flex-col h-[320px]">
          <div className="relative">
            <img
              className="rounded-xl w-full h-[200px] object-cover mb-4"
              src={food?.image}
            />
          </div>

          <SelectFood
            foodName={food.foodName}
            price={food.price}
            image={food.image}
            ingredients={food.ingredients}
            foodId={food._id}
          />

          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-row  justify-between">
              <div className="w-[70%] text-wrap">
                <p className="font-bold text-red-400 text-lg ">
                  {food?.foodName}
                </p>
              </div>
              <p className="font-bold text-lg">
                {formatWithApostrophe(food?.price)}
              </p>
            </div>
            <p className="text-sm text-gray-600">{food?.ingredients}</p>
          </div>
        </div>
      </div>
    )
  );
};
