"use client";
import { CategoryType } from "@/app/(user)/page";
import axios from "axios";
import { useEffect, useState } from "react";
import { Countfoods } from "./countFoods";
import { PlusIcon } from "lucide-react";
import { FoodList } from "./foodList";

export const AdminCategories = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const getCategory = async () => {
    const response = await axios.get("http://localhost:3001/category");
    setCategory(response.data.categories);
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-7 gap-4 p-6 bg-white rounded-xl ">
        <div
          onClick={() => {
            setSelectedCategory("");
          }}
          className={`flex flex-row gap-2 w-fit pr-4 pl-4 h-[36px] border-solid ${
            selectedCategory == "" ? "border-red-500" : "border-black"
          } border text-nowrap justify-center items-center rounded-2xl`}
        >
          <p>All Dishes</p>
          <Countfoods categoryId={""} />
        </div>
        {category.map((item, index) => {
          return (
            <div
              onClick={() => {
                setSelectedCategory(item._id);
              }}
              className={`flex flex-row gap-2 w-fit pr-4 pl-4 h-[36px] border-solid ${
                selectedCategory == item._id ? "border-red-500" : "border-black"
              } border text-nowrap justify-center items-center rounded-2xl`}
            >
              <p>{item.categoryName}</p>
              <Countfoods categoryId={item._id} />
            </div>
          );
        })}

        <button className="text-white bg-red-500 w-9 h-9 rounded-full flex justify-center items-center ml-4 ">
          <PlusIcon size={18} />
        </button>
      </div>
      <FoodList categoryId={selectedCategory} />
    </div>
  );
};
