"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { FoodsType } from "@/app/(user)/page";
import { AdminFoodCard } from "./adminProductCard";
import { AllFoodList } from "./adminAllFoodsList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageIcon, PlusIcon } from "lucide-react";
type FoodsListProps = {
  categoryId: string | "";
};
export const FoodList = ({ categoryId }: FoodsListProps) => {
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
    <div className="   flex flex-col bg-white pr-22 pl-22 pb-22 mt-6 rounded-xl">
      <div className="flex flex-col gap-[54px] pt-11">
        <p className="text-black font-bold text-xl">
          {categoryId !== "" ? foods[0]?.category.categoryName : "All Dishes"}
        </p>
        <div className=" w-full grid grid-cols-4 gap-9">
          {categoryId !== "" && (
            <div className="flex h-[360px] flex-col bg-white rounded-2xl gap-5 p-4 border-dashed border-red-500 border-3 justify-center items-center">
              <Dialog>
                <DialogTrigger className="text-white w-9 h-9 flex justify-center items-center bg-red-500 rounded-full ml-4 ">
                  <PlusIcon size={18} />
                </DialogTrigger>

                <DialogContent className="w-full h-[600px] ">
                  <DialogHeader>
                    <DialogTitle className="pb-10">
                      Add new Dish to {foods[0]?.category.categoryName}
                    </DialogTitle>
                    <DialogDescription>
                      <div className="flex flex-col w-[462px] h-[272px]  gap-10 justify-center pt-40">
                        <div className="flex flex-row gap-6 ">
                          <div className="flex-1 flex flex-col gap-2">
                            <p className="text-black">Food name</p>
                            <input
                              placeholder="Type food name"
                              className=" w-full pr-3 pl-3 pt-2 pb-2 border-solid border"
                            ></input>
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <p className="text-black">Food price</p>
                            <input
                              placeholder="Enter price..."
                              className=" w-full pr-3 pl-3 pt-2 pb-2 border-solid border"
                            ></input>
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <p className="text-black">Ingredients</p>
                          <input
                            placeholder="List ingredients..."
                            className="w-full min-h-[90px] border-solid border p-1"
                          ></input>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <p className="text-black">Image</p>
                          <div className=" flex flex-col realative w-full h-[90px] p-3 bg-[#ecedf1] justify-center items-center mr-auto">
                            {/* <img
                                  className="object-contain w-full h-full border-0 "
                                  src=""
                                /> */}
                            <div className="flex flex-col  absolute items-center justify-center">
                              <div className="p-2 bg-white rounded-full">
                                <ImageIcon size={18} />
                              </div>
                              <label htmlFor="insert-img">
                                {" "}
                                Choose a file or drag & drop it here
                              </label>
                            </div>

                            <input
                              type="file"
                              id="insert-img"
                              className="w-full h-[90px] p-3 bg-[#f1f2f6] border-0 opacity-0 absolute"
                            ></input>
                          </div>
                        </div>
                        <div className="w-full flex flex-col items-end">
                          <button className="flex w-[93px] h-10 justify-center items-center bg-black text-white rounded-xl">
                            Add dish
                          </button>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <p className=" font-medium">Add new Dish</p>
            </div>
          )}
          {categoryId !== "" &&
            foods?.map((item, indx) => {
              return (
                <div key={indx} className="border-solid border rounded-xl">
                  <AdminFoodCard
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
      {categoryId === "" && <AllFoodList />}
      {/* {foodId !== 0 && (
        <FoodDetail
          foodName={foods[foodId].foodName}
          price={foods[foodId].price}
          image={foods[foodId].image}
          ingredients={foods[foodId].ingredients}
          setFoodId={setFoodId}
        />
      )} */}
    </div>
  );
};
