"use client";
import { CategoryType } from "@/app/(user)/page";

import { useAlert } from "@/app/_components/showAlertProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Close, DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { Edit2Icon, ImageIcon, TrashIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DeleteFood } from "./deleteFood";
import { Input } from "@/components/ui/input";
import { CategorySelect } from "./CategorySelect";

type FoodsPropsType = {
  foodId: string;
  name: string;
  price: number;
  image: string;
  categoryName: string;
  ingredients: string;
  categoryId: string;
  getCategory: () => Promise<void>;
  getFoods: () => Promise<void>;
};
export type newFoodsType = {
  foodId: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

export const AdminFoodCard = ({
  name,
  price,
  image,
  ingredients,
  foodId,
  categoryName,
  categoryId,
  getFoods,
  getCategory,
}: FoodsPropsType) => {
  const [newFoodName, setNewFoodName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const [newIngredients, setNewIngredients] = useState(ingredients);
  const [newImg, setNewImg] = useState(image);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);

  const updateFood = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/food/${foodId}`, {
        foodName: newFoodName,
        price: newPrice,
        image: newImg,
        ingredients: newIngredients,
        categoryId: selectedCategoryId,
      });
      await getFoods();
      await getCategory();
    } catch (error) {
      console.error("amjiltgui", error);
    }
  };

  const deleteFood = async () => {
    try {
      const response = await axios.delete("http://localhost:3001/food", {
        data: { _id: foodId },
      });

      await getFoods();
    } catch (error) {
      console.error("amjiltgui", error);
    }
  };

  return (
    <div className="flex relative h-[340px] flex-col bg-white rounded-2xl gap-5 p-4">
      <img className="h-[200px] rounded-xl  " src={image}></img>
      <div className="flex flex-row  justify-between">
        <p className="font-bold text-red-300 ">{name}asdasd</p>
        <p>{price}</p>
      </div>
      <p className="text-sm">{ingredients}</p>
      <div className="absolute left-[70%] top-[40%]">
        <Dialog>
          <DialogTrigger className="text-red-500 w-9 h-9 flex justify-center items-center bg-white rounded-full ml-4 ">
            <Edit2Icon size={18} />
          </DialogTrigger>

          <DialogContent className="w-full h-[600px] ">
            <DialogHeader>
              <DialogTitle className="pb-10">Dishes info</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col w-[462px] h-[272px]  gap-10 justify-center pt-40">
                  <div className="flex flex-col gap-6 ">
                    <div className="flex-1 flex flex-row gap-6 text-nowrap justify-between items-center rounded-xl">
                      Dish name
                      <Input
                        value={newFoodName}
                        name="foodName"
                        onChange={(e) => setNewFoodName(e.target.value)}
                        placeholder="Type food name"
                        className=" w-[288px] pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
                      ></Input>
                    </div>
                    <CategorySelect
                      setSelectedCategoryId={setSelectedCategoryId}
                      categoryName={categoryName}
                    />
                  </div>
                  <div className="w-full flex flex-row justify-between">
                    <p>Ingredients</p>
                    <Input
                      onChange={(e) => setNewIngredients(e.target.value)}
                      value={newIngredients}
                      name="ingredients"
                      placeholder="List ingredients..."
                      className="w-[288px] min-h-[90px] border-solid border p-1 rounded-sm"
                    />
                  </div>
                  <div className="flex-1 flex flex-row gap-6 text-nowrap justify-between items-center rounded-xl">
                    <p>Price</p>
                    <Input
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      name="price"
                      value={newPrice}
                      placeholder="Enter price"
                      className=" w-[288px] pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
                    />
                  </div>
                  {/* <div className="w-full flex flex-row justify-between items-center">
                    <p>Image</p>

                    <div className="flex  flex-col relative w-[288px] h-[90px] p-3 bg-[#ecedf1] justify-center items-center rounded-sm">
                      <img
                        className={` w-[100%] h-[100%] ${
                          newFood.image ? "z-10 " : "z-0"
                        } `}
                        src={image}
                      />
                      {newFood.image && (
                        <button
                          onClick={() => {
                            const newvalue = { ...newFood };
                            newvalue.image = "";
                            setNewFood(newvalue);
                          }}
                          className="text-black absolute w-4 h-4 flex justify-center items-center bg-white rounded-full z-10 left-[90%] bottom-[65%]"
                        >
                          <X />
                        </button>
                      )}
                      <div className="flex flex-col absolute items-center justify-center">
                        <div className="p-2 bg-white rounded-full">
                          <ImageIcon size={18} />
                        </div>
                        <label htmlFor="insert-img"></label>
                      </div>

                      <Input
                        onChange={(e) => {
                          const newvalue = { ...newFood };
                          const newImage = e.target.files?.[0];
                          if (newImage) {
                            newvalue.image = URL.createObjectURL(newImage);
                          }
                          setNewFood(newvalue);
                        }}
                        type="file"
                        id="insert-img"
                        className="w-[288px] h-[90px] p-3 bg-[#f1f2f6] border-0 opacity-0 absolute"
                      />
                    </div>
                  </div> */}

                  <div className="w-full flex flex-row justify-between">
                    <TrashIcon
                      onClick={() => {
                        deleteFood();
                      }}
                      className="text-red-500"
                    />
                    <button
                      onClick={() => {
                        updateFood();
                      }}
                      className="flex w-[126px] h-10 justify-center items-center bg-black text-white rounded-xl"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
