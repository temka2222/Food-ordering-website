import { useEffect, useState } from "react";
import { FoodCard } from "./productCard";
import { FoodsType } from "../page";
import { api } from "@/app/axios";

type CategoriesFoodListType = {
  categoryId: string;
};
export const CategoriesFoodList = ({ categoryId }: CategoriesFoodListType) => {
  const [foods, setFoods] = useState<FoodsType[]>([]);

  const getFoods = async () => {
    const response = await api.get(`/food?categoryId=${categoryId}`);
    setFoods(response.data.foods);
  };

  useEffect(() => {
    getFoods();
  }, [categoryId]);
  return (
    <div className="flex flex-col gap-[54px] pt-11 pl-22 pr-22 ">
      <p className="text-white font-bold text-xl">
        {foods[0]?.category.categoryName}
      </p>
      <div className=" w-full grid grid-cols-4 gap-9 shadow-lg shadow-stone-950 rounded-xl p-6 ">
        {foods?.map((item, indx) => {
          return (
            <div
              key={indx}
              className="rounded-xl shadow-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <FoodCard foodId={item._id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
