"use client";
import { CategoryType } from "@/app/(user)/page";
import axios from "axios";
import { useEffect, useState } from "react";
import { Countfoods } from "./countFoods";
import { PlusIcon, Target } from "lucide-react";
import { FoodList } from "./foodList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export const AdminCategories = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");

  const getCategory = async () => {
    const response = await axios.get("http://localhost:3001/category");
    setCategory(response.data.categories);
  };

  const addCategory = async () => {
    try {
      const response = await axios.post("http://localhost:3001/category", {
        categoryName: newCategory,
      });
      getCategory();
    } catch (error) {
      console.error("amjiltgui", error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="w-full">
      <div className="grid  grid-cols-5 gap-4 p-6 bg-white rounded-xl justify-between overflow-visible">
        <div
          onClick={() => setSelectedCategory("")}
          className={`flex flex-row gap-2 w-fit pr-4 pl-4 h-[36px] border-solid ${
            selectedCategory === "" ? "border-red-500" : "border-black"
          } border text-nowrap justify-center items-center rounded-2xl`}
        >
          <p>All Dishes</p>
          <Countfoods categoryId={""} />
        </div>

        {category.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(item._id)}
            className={`flex flex-row justify-between w-fit pr-4 pl-4 h-[36px] border-solid ${
              selectedCategory === item._id ? "border-red-500" : "border-black"
            } border text-nowrap items-center rounded-2xl`}
          >
            <p className="min-w-[100px]">{item.categoryName}</p>
            <Countfoods categoryId={item._id} />
          </div>
        ))}

        <Dialog>
          <DialogTrigger className="text-white w-9 h-9 flex justify-center items-center bg-red-500 rounded-full">
            <PlusIcon size={18} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new category</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col w-[462px] h-[272px] gap-10 justify-center">
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-black">Category name</p>
                    <input
                      onChange={(event) => setNewCategory(event.target.value)}
                      placeholder="Type category name..."
                      className="w-full pr-3 pl-3 pt-2 pb-2 border-solid border"
                    />
                  </div>

                  <div className="w-full flex flex-col items-end">
                    <button
                      onClick={() => addCategory()}
                      className="flex w-[123px] h-10 justify-center items-center bg-black text-white rounded-xl"
                    >
                      Add category
                    </button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <FoodList categoryId={selectedCategory} getCategory={getCategory} />
    </div>
  );
};
