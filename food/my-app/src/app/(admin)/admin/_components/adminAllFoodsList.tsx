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
  <div className="w-full flex flex-col gap-14">
    {allCategory.map((element) => {
      const filteredFoods = foods.filter(
        (cat) => cat.category.categoryName === element.categoryName
      );

      if (filteredFoods.length === 0) return null;

      return (
        <div
          key={element._id}
          className="w-full bg-white p-8 rounded-3xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
 <div className="mb-6 border-gray-300 pb-3 flex flex-row gap-2 items-end ">
            <h2 className="text-xl font-bold text-black ">
              {element.categoryName}
            </h2>
            <span className="text-sm text-gray-400">
              {filteredFoods.length} dish{filteredFoods.length > 1 ? "es" : ""}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <AddNewFood categoryId={element._id} getFoods={getFoods} />
            {filteredFoods.map((item) => (
              <div key={item._id} className="border rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
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
