"use client";
import { useEffect, useState } from "react";
import { FoodsType } from "../page";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { FoodDetail } from "../../_components/foodDetail";
import { FoodCard } from "../../_components/productCard";
import { Categories } from "../../_components/Categories";

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
  console.log(foods);

  return (
    <div className="   flex flex-col bg-[#404040] pr-22 pl-22 pb-22  ">
      <div className="h-142">
        <img className="object-fit" src="/BG.png"></img>
      </div>
      <Categories />
      <div className="flex flex-col gap-[54px] pt-11">
        <p className="text-white font-bold text-xl">
          {foods[0]?.category.categoryName}
        </p>
        <div className=" w-full grid grid-cols-3 gap-9">
          {foods?.map((item, indx) => {
            return (
              <div key={indx}>
                <FoodCard
                  foodName={item.foodName}
                  price={item.price}
                  image={item.image}
                  ingredients={item.ingredients}
                  category={item.category}
                  setFoodId={setFoodId}
                  indx={indx}
                />
              </div>
            );
          })}
        </div>
      </div>

      {foodId !== 0 && (
        <FoodDetail
          foodName={foods[foodId].foodName}
          price={foods[foodId].price}
          image={foods[foodId].image}
          ingredients={foods[foodId].ingredients}
          setFoodId={setFoodId}
        />
      )}
    </div>
  );
}
