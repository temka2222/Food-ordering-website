import { useEffect, useState } from "react";
import { FoodsType } from "../page";

import { formatWithApostrophe } from "./productCard";
import { X } from "lucide-react";
import { useSelecFood } from "./SelectedFoodProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/app/axios";

type CardFoodProductType = {
  foodId: string;
  index: number;
};
export const CardFoodProduct = ({ foodId, index }: CardFoodProductType) => {
  const [food, setFood] = useState<FoodsType>();

  const { selectedFood, setSelectedFood } = useSelecFood();
  const newValue = [...selectedFood];
  const getFood = async () => {
    const response = await api.get(`/food/${foodId}`);
    setFood(response.data.food);
  };

  useEffect(() => {
    getFood();
  }, [foodId]);
  const deleteFoodFromCard = (deleteFoodId: string) => {
    const newFoodCart = selectedFood.filter((food) => {
      return food.foodId !== deleteFoodId;
    });
    setSelectedFood(newFoodCart);
  };
  return food ? (
    <div className=" relative flex-1 flex max-h-screen flex-row h-[412px] bg-white p-6  gap-4 overflow-y-scroll rounded-2xl">
      <div className="flex-1">
        <img
          className="w-full h-full rounded-xl object-cover"
          src={food?.image}
        />
      </div>
      <div className="flex-3 h-full flex flex-col items-end">
        <div className="flex h-full w-full flex-col justify-between items-start">
          <div className="flex flex-col gap-3">
            <p className="text-red-400 font-bold text-2xl">{food?.foodName}</p>
            <p className="text-[#71717A]">{food.ingredients}</p>
          </div>
          <div className="flex w-full flex-col gap-6">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-3 ">
                <button
                  className="pl-2 pr-2  bg-white border-solid border rounded-full"
                  onClick={() => {
                    if (selectedFood[index].qty == 1) return;
                    if (selectedFood[index].qty > 1) {
                      const number = selectedFood[index].qty - 1;
                      newValue[index].qty = number;
                      setSelectedFood(newValue);
                    }
                  }}
                >
                  -
                </button>
                <p>{selectedFood[index].qty}</p>
                <button
                  className="pl-2 pr-2  bg-white border-solid border rounded-full"
                  onClick={() => {
                    const number = selectedFood[index].qty + 1;
                    newValue[index].qty = number;
                    setSelectedFood(newValue);
                  }}
                >
                  +
                </button>
              </div>
              <p className="font-bold">
                ₮{formatWithApostrophe(food?.price * selectedFood[index].qty)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          deleteFoodFromCard(foodId);
        }}
        className="absolute top-4 right-4 p-1  bg-white border border-red-500 rounded-full text-red-500"
      >
        <X size={12} />
      </button>
    </div>
  ) : (
    <div className="   w-full flex flex-row  bg-white p-6  gap-4">
      <Skeleton className="flex-1 h-10 w-10" />
      <Skeleton className="flex-3 h-10 w-30" />
    </div>
  );
};
