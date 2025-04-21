"use client";
import { useEffect, useState } from "react";
import { Categories } from "./_components/Categories";
import { useFoods } from "./_components/foodsProvider";
import { FoodCard } from "./_components/productCard";
import { UserProvider, useUser } from "./sign-up/_components/userValueProvider";
import { FoodDetail } from "./_components/foodDetail";
import axios from "axios";
import { relative } from "path";

export default function Home() {
  const [fooods, setFoods] = useState(null);
  const { foods } = useFoods();
  const { userValues, setUserValues } = useUser();

  const [foodId, setFoodId] = useState<number>(0);
  // const getFoods = async () => {
  //   const response = await axios.get("http://localhost:3001/food");
  //   setFoods(response.data);
  //   console.log(" vresponse", response);
  // };

  // useEffect(() => {
  //   getFoods();
  // }, []);
  return (
    <div className="   flex flex-col bg-[#404040] pr-22 pl-22 pb-22 ">
      <div className="h-142">
        <img className="object-fit" src="/BG.png"></img>
      </div>
      <Categories />
      <div className="flex flex-col gap-[54px]">
        <p className="text-white font-bold text-xl">1-р хоол</p>
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
        <p className="text-white font-bold text-xl">2-р хоол</p>
        <div className=" w-full grid grid-cols-3 gap-9">
          {foods?.map((item, indx) => {
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
