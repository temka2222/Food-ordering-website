"use client";
import { DoorClosed } from "lucide-react";
import { useState } from "react";

type FoodsType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  setFoodId: (value: number) => void;
};
export const FoodDetail = ({
  foodName,
  price,
  image,
  ingredients,
  setFoodId,
}: FoodsType) => {
  const [selectedQty, setSelectedQty] = useState<number>(1);

  return (
    <div className=" absolute flex flex-row w-[826px] h-[412px] top-1/2 right-1/::   bg-white p-6 rounded-xl gap-6">
      <div className="flex-1">
        <img className=" w-full h-full rounded-xl" src={image} />
      </div>
      <div className="flex-1 h-full flex flex-col  items-end">
        <button
          onClick={() => setFoodId(0)}
          className="pl-4 pr-4 pt-2 pb-2 bg-white border-solid border rounded-full"
        >
          x
        </button>
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-red-400 font-bold text-2xl">{foodName}</p>
            <p className="text-[16px]">{ingredients}</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between ">
              <div className="flex flex-col">
                <p>Toatal price</p>
                <p className="font-bold">₮{price * selectedQty}</p>
              </div>
              <div className="flex flex-row items-center gap-3 ">
                <button
                  className="pl-4 pr-4 pt-2 pb-2 bg-white border-solid border rounded-full "
                  onClick={() => {
                    if (selectedQty == 1) return;
                    if (selectedQty > 1) setSelectedQty(selectedQty - 1);
                  }}
                >
                  -
                </button>
                <p>{selectedQty}</p>
                <button
                  className="pl-4 pr-4 pt-2 pb-2 bg-white border-solid border rounded-full"
                  onClick={() => {
                    setSelectedQty(selectedQty + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <button className="  bg-black text-white pr-8 pl-8 pt-2 pb-2 rounded-2xl  ">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
