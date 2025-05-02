import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { CategoryType } from "../page";
import { SelectFood } from "./SelectFood";

type FoodsType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: CategoryType;
  foodId: string;
};
export function formatWithApostrophe(number: number): string {
  let numStr = number.toString();
  const formattedStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return formattedStr;
}
export const FoodCard = ({
  foodName,
  price,
  image,
  ingredients,
  category,
  foodId,
}: FoodsType) => {
  return (
    <div className="relative flex flex-col bg-white rounded-2xl gap-5 p-4 shadow-lg shadow-stone-800">
      <div className="flex flex-col h-[320px]">
        <div className="relative">
          <img
            className="rounded-xl w-full h-[200px] object-cover mb-4"
            src={image}
          />
        </div>
        <SelectFood
          foodName={foodName}
          price={price}
          image={image}
          ingredients={ingredients}
          foodId={foodId}
        />
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-row  justify-between">
            <div className="w-[70%] text-wrap">
              <p className="font-bold text-red-400 text-lg ">{foodName}</p>
            </div>
            <p className="font-bold text-lg">{formatWithApostrophe(price)}</p>
          </div>
          <p className="text-sm text-gray-600">{ingredients}</p>
        </div>
      </div>
    </div>
  );
};
