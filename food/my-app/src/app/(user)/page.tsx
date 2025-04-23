"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import { relative } from "path";
import { useUser } from "../(auth)/sign-up/_components/userValueProvider";
import { Categories } from "../_components/Categories";
import { FoodCard } from "../_components/productCard";
import { FoodDetail } from "../_components/foodDetail";
export type CategoryType = {
  categoryName: String;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
export type FoodsType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: CategoryType;
  createdAt: Date;
  updatedAt: Date;
};
export default function Home() {
  const [foods, setFoods] = useState<FoodsType[]>([]);

  const { userValues, setUserValues } = useUser();

  const [foodId, setFoodId] = useState<number>(0);
  const getFoods = async () => {
    const response = await axios.get("http://localhost:3001/food");
    setFoods(response.data.foods);
  };

  useEffect(() => {
    getFoods();
  }, []);
  return (
    <div className="   flex flex-col bg-[#404040]  pb-22 ">
      <div className="h-142">
        <img className="object-fit" src="/BG.png"></img>
      </div>
      <Categories />
      <div className="flex flex-col gap-[54px] pr-22 pl-22">
        <p className="text-white font-bold text-xl">1-р хоол</p>
        <div className=" w-full grid grid-cols-3 gap-9">
          {foods?.slice(0, 6).map((item, indx) => {
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
        <p className="text-white font-bold text-xl">2-р хоол</p>
        <div className=" w-full grid grid-cols-3 gap-9">
          {foods
            ?.filter((item) => {
              return item.category.categoryName === "Зууш";
            })
            .map((item, indx) => {
              return (
                <div key={indx} className={indx == foodId ? "relative" : ""}>
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
        <p className="text-white font-bold text-xl">Салат</p>
        <div className=" w-full grid grid-cols-3 gap-9">
          {foods
            ?.filter((item) => {
              return item.category.categoryName === "Уух зүйл";
            })
            .slice(0, 6)
            .map((item, indx) => {
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
