import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageIcon, PlusIcon } from "lucide-react";
import { FoodsListProps } from "./foodList";
import axios from "axios";
import { CategoryType } from "@/app/(user)/page";
import { useEffect, useState } from "react";
import { useNewFood } from "@/app/_components/foodsProvider";
type NewFoodPropsType = {
  categoryId: string;
  getFoods: () => Promise<void>;
};
export const AddNewFood = ({ categoryId, getFoods }: NewFoodPropsType) => {
  const { newFood, setNewFood } = useNewFood();
  const [category, setCategory] = useState<CategoryType[]>([]);
  const getCategory = async () => {
    const response = await axios.get(
      `http://localhost:3001/category?categoryId=${categoryId}`
    );

    setCategory(response.data.categories);
  };

  useEffect(() => {
    getCategory();
  }, []);
  const addNewFood = async () => {
    try {
      const response = await axios.post("http://localhost:3001/food", {
        foodName: newFood.foodName,
        price: newFood.price,
        category: newFood.category,
        image: newFood.image,
        ingredients: newFood.ingredients,
      });
      await getFoods();
    } catch (error) {
      console.error("amjiltgui", error);
    }
  };

  return (
    <div className="flex h-[340px] flex-col bg-white rounded-2xl gap-5 p-4 border-dashed border-red-500 border-3 justify-center items-center">
      <Dialog>
        <DialogTrigger
          onClick={() => {
            const newvalue = { ...newFood };
            newvalue.category = categoryId;
            newvalue.image = "";
            setNewFood(newvalue);
          }}
          className="text-white w-9 h-9 flex justify-center items-center bg-red-500 rounded-full ml-4 "
        >
          <PlusIcon size={18} />
        </DialogTrigger>

        <DialogContent className="w-full h-[600px] ">
          <DialogHeader>
            <DialogTitle className="pb-10">
              Add new Dish to {category[0]?.categoryName}
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col w-[462px] h-[272px]  gap-10 justify-center pt-40">
                <div className="flex flex-row gap-6 ">
                  <div className="flex-1 flex flex-col gap-2">
                    <p className="text-black">Food name</p>
                    <input
                      onChange={(e) => {
                        const newvalue = { ...newFood };
                        newvalue.foodName = e.target.value;
                        setNewFood(newvalue);
                      }}
                      placeholder="Type food name"
                      className=" w-full pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
                    ></input>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 text-black">
                    Food price
                    <input
                      onChange={(e) => {
                        const newvalue = { ...newFood };
                        newvalue.price = e.target.value
                          ? parseInt(e.target.value)
                          : 0;
                        setNewFood(newvalue);
                      }}
                      placeholder="Enter price..."
                      className=" w-full pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
                    ></input>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <p className="text-black">Ingredients</p>
                  <input
                    onChange={(e) => {
                      const newvalue = { ...newFood };
                      newvalue.ingredients = e.target.value;
                      setNewFood(newvalue);
                    }}
                    placeholder="List ingredients..."
                    className="w-full min-h-[90px] border-solid border p-1 rounded-sm"
                  ></input>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <p className="text-black">Image</p>
                  <div className=" flex flex-col realative w-full h-[90px] p-3 bg-[#ecedf1] justify-center items-center mr-auto rounded-sm">
                    <img
                      className={` w-[100%] h-[100%] ${
                        newFood.image ? "z-10 " : "z-0"
                      } `}
                      src={newFood.image}
                    />
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
                      className="w-full h-[90px] p-3 bg-[#f1f2f6] border-0 opacity-0 absolute"
                    ></input>
                  </div>
                </div>
                <div className="w-full flex flex-col items-end">
                  <button
                    onClick={() => {
                      addNewFood();
                    }}
                    className="flex w-[93px] h-10 justify-center items-center bg-black text-white rounded-xl"
                  >
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
  );
};
