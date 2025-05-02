"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DoorClosed, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { formatWithApostrophe } from "./productCard";

type SelectFoodType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  foodId: string;
};
export const SelectFood = ({
  foodName,
  price,
  image,
  ingredients,
  foodId,
}: SelectFoodType) => {
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [check, setCheck] = useState(false);
  const [selctedFoodId, SetSelectedFoodId] = useState(foodId);
  useEffect(() => {
    if (!check) return;
    window.localStorage.setItem("foodId", foodId);
    window.localStorage.setItem("selectedQty", String(selectedQty));
    setCheck(true);
  }, [check, foodId, selectedQty]);
  useEffect(() => {
    setCheck(true);
    const storedSelectedQty = localStorage.getItem("selectedQty");
    const storedSelectedFoodId = localStorage.getItem("selectedFoodId");
    if (storedSelectedQty !== null) {
      setSelectedQty(Number(storedSelectedQty));
    }
    if (storedSelectedFoodId !== null) {
      SetSelectedFoodId(storedSelectedFoodId);
    }
  }, []);
  console.log(selctedFoodId, selectedQty);
  return (
    <div className="absolute left-[75%] top-[45%]">
      <Dialog>
        <DialogTrigger className="text-red-500 w-9 h-9 flex justify-center items-center bg-white rounded-full ">
          <PlusIcon size={18} />
        </DialogTrigger>
        <DialogContent className="  flex flex-row h-[412px] bg-white p-6 rounded-xl">
          <div className="flex-1">
            <img
              className=" w-full h-full rounded-xl object-cover"
              src={image}
            />
          </div>
          <div className="flex-1 h-full flex flex-col  items-end">
            <div className="flex h-full w-full flex-col justify-between items-start">
              <div className="flex flex-col gap-3">
                <p className="text-red-400 font-bold text-2xl">{foodName}</p>
                <p className="text-[16px]">{ingredients}</p>
              </div>
              <div className="flex w-full flex-col gap-6">
                <div className="flex  flex-row justify-between ">
                  <div className="flex flex-col">
                    <p>Toatal price</p>
                    <p className="font-bold">
                      ₮{formatWithApostrophe(price * selectedQty)}
                    </p>
                  </div>
                  <div className="flex   flex-row items-center gap-3 ">
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
        </DialogContent>
      </Dialog>
    </div>
  );
};
