"use client";
import { CategoryType } from "@/app/(user)/page";

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
import { Input } from "@/components/ui/input";
import { CategorySelect } from "./CategorySelect";
import { toast } from "sonner";
import { FoodImage } from "./updateFoodImage";
import { formatWithApostrophe } from "@/app/(user)/_components/productCard";

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
export const UPLOAD_PRESET = "temuulen";
export const CLOUD_NAME = "dpmo1etqt";
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
  const [newImg, setNewImg] = useState<File | undefined>();
  const [uploadedUrl, SetUploadedUrl] = useState(image);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const uploadImage = async (file: File | undefined) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  const updateFood = async (uploadedUrl: string) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3001/food/${foodId}`, {
        foodName: newFoodName,
        price: newPrice,
        image: uploadedUrl,
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
        image: uploadedUrl,
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
    <div className="flex relative h-[340px] flex-col bg-white rounded-2xl gap-5 p-4  ">
      <img
        className="h-[200px] w-full object-cover rounded-xl"
        src={image}
        alt="food"
      />
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold text-red-400 text-lg truncate">{name}</p>
        <p className="text-gray-800 font-medium">
          {formatWithApostrophe(price)}₮
        </p>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{ingredients}</p>
      <div className="absolute left-[65%] top-[40%]">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="text-red-500 w-9 h-9 flex justify-center items-center bg-white rounded-full ml-4">
            <Edit2Icon size={18} />
          </DialogTrigger>

          <DialogContent className="w-full max-w-[600px] px-8 py-10 rounded-xl bg-white shadow-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-800 mb-6">
                Dishes Info
              </DialogTitle>

              <DialogDescription>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">
                      Dish Name
                    </label>
                    <Input
                      value={newFoodName}
                      name="foodName"
                      onChange={(e) => setNewFoodName(e.target.value)}
                      placeholder="Type food name"
                      className="w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <CategorySelect
                    setSelectedCategoryId={setSelectedCategoryId}
                    categoryName={categoryName}
                  />

                  <div className="flex justify-between items-start">
                    <label className="text-sm font-medium text-gray-700">
                      Ingredients
                    </label>
                    <Input
                      onChange={(e) => setNewIngredients(e.target.value)}
                      value={newIngredients}
                      name="ingredients"
                      placeholder="List ingredients..."
                      className="w-[300px] min-h-[90px] px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <Input
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      name="price"
                      value={formatWithApostrophe(newPrice)}
                      placeholder="Enter price"
                      className="w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <FoodImage
                    image={image}
                    newImg={newImg}
                    setNewImg={setNewImg}
                  />

                  <div className="flex justify-between items-center pt-4">
                    <TrashIcon
                      onClick={deleteFood}
                      className="text-red-500 cursor-pointer"
                    />
                    <button
                      disabled={loading}
                      onClick={async () => {
                        const url = newImg
                          ? await uploadImage(newImg)
                          : uploadedUrl;
                        if (url) {
                          updateFood(url);
                        }
                      }}
                      className="w-[140px] h-10 flex justify-center items-center bg-black text-white rounded-md"
                    >
                      {loading ? (
                        <Loader size={18} className="animate-spin" />
                      ) : (
                        "Save Changes"
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
