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
import { Edit2Icon, ImageIcon, Loader, TrashIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DeleteFood } from "./deleteFood";
import { Input } from "@/components/ui/input";
import { CategorySelect } from "./CategorySelect";
import { toast } from "sonner";
import { FoodImage } from "./foodImage";

type FoodsPropsType = {
  foodId: string;
  name: string;
  price: number;
  image: File | undefined;
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
  image?: File;
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
  const [newImg, setNewImg] = useState<File | undefined>(image);

  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const UPLOUD_PRESSET = "temuulen";
  const CLOUD_NAME = "dpmo1etqt";
  const uploadImage = async (file: File | undefined) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOUD_PRESSET);
    try {
      const responseImg = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/formData",
          },
        }
      );
      return responseImg.data.url;
    } catch (error) {
      console.log(error);
    }
  };
  const updateFood = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3001/food/${foodId}`, {
        foodName: newFoodName,
        price: newPrice,
        image: newImg,
        ingredients: newIngredients,
        categoryId: selectedCategoryId,
      });

      await getFoods();

      toast.success("successfully updated the food");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update food");
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async () => {
    try {
      setLoading(true);
      const response = await axios.delete("http://localhost:3001/food", {
        data: { _id: foodId },
      });

      await getFoods();
      toast.success("Dish successfully deleted.", {
        description: "Would you like to undo this action?",
        action: {
          label: "Undo",
          onClick: () => undoDeleteFood(),
        },
      });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete food");
    } finally {
      setLoading(false);
    }
  };
  const undoDeleteFood = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/food", {
        foodName: name,
        price: price,
        category: categoryId,
        image: image,
        ingredients: ingredients,
      });
      await getFoods();
      toast.success("undo successful!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative h-[340px] flex-col bg-white rounded-2xl gap-5 p-4">
      <img className="h-[200px] rounded-xl  " src={image}></img>
      <div className="flex flex-row  justify-between">
        <p className="font-bold text-red-300 object-contain">{name}</p>
        <p>{price}</p>
      </div>
      <p className="text-sm">{ingredients}</p>
      <div className="absolute left-[65%] top-[40%]">
        <Dialog open={open} onOpenChange={setOpen}>
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
                  <FoodImage
                    image={image}
                    newImg={newImg}
                    setNewImg={setNewImg}
                  />

                  <div className="w-full flex flex-row justify-between">
                    <TrashIcon
                      onClick={() => {
                        deleteFood();
                      }}
                      className="text-red-500"
                    />
                    <button
                      disabled={loading}
                      onClick={() => {
                        updateFood();
                      }}
                      className="flex w-[126px] h-10 justify-center items-center bg-black text-white rounded-xl"
                    >
                      {loading ? (
                        <Loader size={18} className="animate-spin" />
                      ) : (
                        "Save changes"
                      )}
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
