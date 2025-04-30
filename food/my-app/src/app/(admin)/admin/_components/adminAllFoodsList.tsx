"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { CategoryType, FoodsType } from "@/app/(user)/page";
import { AdminFoodCard } from "./adminProductCard";
import { AddNewFood } from "./addNewFood";
type FoodsListProps = {
  getCategory: () => Promise<void>;
};

export const AllFoodList = ({ getCategory }: FoodsListProps) => {
  const [foods, setFoods] = useState<FoodsType[]>([]);
  const [allCategory, setAllCategory] = useState<CategoryType[]>([]);
  const [foodId, setFoodId] = useState<number>(0);

  const getFoods = async () => {
    const response = await axios.get(
      `http://localhost:3001/food?categoryId=${""}`
    );
    setFoods(response.data.foods);

    const responseCategory = await axios.get("http://localhost:3001/category");
    setAllCategory(responseCategory.data.categories);
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="w-full">
      {allCategory.map((element, index) => {
        return (
          <div key={element._id} className="w-full flex flex-col gap-6 ">
            <p className="text-black font-bold text-xl  ">
              {foods?.filter(
                (cat) => cat.category.categoryName === element.categoryName
              ).length > 0
                ? element.categoryName
                : ""}
            </p>
            <div key={index} className=" w-full grid grid-cols-4 gap-9">
              {foods?.filter(
                (cat) => cat.category.categoryName === element.categoryName
              ).length > 0 && (
                <AddNewFood categoryId={element._id} getFoods={getFoods} />
              )}
              {foods
                ?.filter(
                  (itm) => itm.category.categoryName === element.categoryName
                )
                ?.map((item, indx) => (
                  <div
                    key={item._id}
                    className="border-solid border rounded-2xl"
                  >
                    <AdminFoodCard
                      name={item.foodName}
                      price={item.price}
                      image={item.image}
                      ingredients={item.ingredients}
                      foodId={item._id}
                      categoryName={item.category.categoryName}
                      getFoods={getFoods}
                      getCategory={getCategory}
                      categoryId={element._id}
                    />
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
