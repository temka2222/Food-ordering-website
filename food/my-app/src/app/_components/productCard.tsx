import { CategoryType } from "../(user)/page";
import { useFoods } from "./foodsProvider";

type FoodsType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: CategoryType;
  setFoodId: (value: number) => void;
  indx: number;
};
export const FoodCard = ({
  foodName,
  price,
  image,
  ingredients,
  category,
  setFoodId,
  indx,
}: FoodsType) => {
  return (
    <div
      onClick={() => {
        setFoodId(indx);
      }}
      className="flex h-[360px] flex-col bg-white rounded-2xl gap-5 p-4"
    >
      <img className="rounded-xl" src={image}></img>
      <div className="flex flex-row  justify-between">
        <p className="font-bold text-red-400 ">{foodName}</p>
        <p className=" font-bold ">{price}</p>
      </div>
      <p className="text-sm">{ingredients}</p>
    </div>
  );
};
