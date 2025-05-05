import { useEffect, useState } from "react";
import { FoodsType } from "../page";
import axios from "axios";
import { formatWithApostrophe } from "./productCard";

type CardFoodProductType={
    foodId:string;
    quantity:number;
}
export const CardFoodProduct=({foodId,quantity}:CardFoodProductType)=>{
     const [food,setFood]=useState<FoodsType>()
     const [selectedQty,setSelectedQty]=useState(1)
    const getFood = async () => {
    const response = await axios.get(
      `http://localhost:3001/food/${foodId}`
    );
    setFood(response.data.food);
 
  };

  useEffect(() => {
    getFood();
  }, [foodId]);
    return(
    food&&
    <div className="flex-1 flex flex-row h-[412px] bg-white p-6  gap-4">
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
              <p className="">{food.ingredients}</p>
            </div>
            <div className="flex w-full flex-col gap-6">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-3 ">
                  <button
                    className="pl-4 pr-4 pt-2 pb-2 bg-white border-solid border rounded-full"
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
                 <p className="font-bold">
                    ₮{formatWithApostrophe(food?.price * selectedQty)}
                  </p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    
       
      );
    
    

}