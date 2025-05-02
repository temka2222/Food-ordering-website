"use client";
import { useEffect, useState } from "react";
import { FoodsType } from "../page";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Categories } from "../../_components/Categories";
import { FoodCard } from "../_components/productCard";

export default function SearchCategory() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [foods, setFoods] = useState<FoodsType[]>([]);
  const [foodId, setFoodId] = useState<number>(0);
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
    <div className="   flex flex-col bg-[#404040]   pb-22  ">
      <div className=" h-142 object-cover">
        <img className="object-cover relative " src="/BG.png"></img>
      </div>
      <Categories />
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
                <FoodCard
                  foodName={item.foodName}
                  price={item.price}
                  image={item.image}
                  ingredients={item.ingredients}
                  category={item.category}
                  foodId={item._id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
