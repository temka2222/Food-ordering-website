"use client";
import { CategoryType } from "@/app/(user)/page";
import { useNewFood } from "@/app/_components/foodsProvider";
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
import {
  DoorClosedIcon,
  Edit2Icon,
  ImageIcon,
  PlusIcon,
  ShieldCloseIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
type FoodsPropsType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: CategoryType;
  categoryName: string;
  setFoodId: (value: number) => void;
  indx: number;
};
export const AdminFoodCard = ({
  foodName,
  price,
  image,
  ingredients,
  category,
  setFoodId,
  categoryName,
  indx,
}: FoodsPropsType) => {
  const { newFood, setNewFood } = useNewFood();
  const [allCategory, setAllCategory] = useState<CategoryType[]>([]);
  const getCategory = async () => {
    const response = await axios.get("http://localhost:3001/category");
    setAllCategory(response.data.categories);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const updateFood = async () => {
    try {
      const response = await axios.post("http://localhost:3001/food", {});
    } catch (error) {
      console.error("amjiltgui", error);
    }
  };
  return (
    <div
      onClick={() => {
        setFoodId(indx);
      }}
      className="flex relative h-[340px] flex-col bg-white rounded-2xl gap-5 p-4"
    >
      <img className="h-[200px] rounded-xl  " src={image}></img>
      <div className="flex flex-row  justify-between">
        <p className="font-bold text-red-300 ">{foodName}</p>
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
                      <p>Dish name</p>
                      <input
                        value={foodName}
                        onChange={(e) => {
                          const newvalue = { ...newFood };
                          newvalue.foodName = e.target.value;
                          setNewFood(newvalue);
                        }}
                        placeholder="Type food name"
                        className=" w-[288px] pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
                      ></input>
                    </div>
                    <div className="flex-1 flex flex-row gap-6 text-nowrap justify-between items-center  ">
                      Dish category
                      <select
                        onChange={(e) => {
                          const newvalue = { ...newFood };
                          newvalue.category.categoryName = e.target.value;
                          setNewFood(newvalue);
                        }}
                        value={
                          newFood.category.categoryName
                            ? newFood.category.categoryName
                            : categoryName
                        }
                        className=" w-[288px] pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
                      >
                        {allCategory.map((item, index) => {
                          return <option>{item.categoryName}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="w-full flex flex-row justify-between">
                    <p>Ingredients</p>
                    <input
                      onChange={(e) => {
                        const newvalue = { ...newFood };
                        newvalue.ingredients = e.target.value;
                        setNewFood(newvalue);
                      }}
                      value={ingredients}
                      placeholder="List ingredients..."
                      className="w-[288px] min-h-[90px] border-solid border p-1 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex-1 flex flex-row gap-6 text-nowrap justify-between items-center rounded-xl">
                    <p>Price</p>
                    <input
                      onChange={(e) => {
                        const newvalue = { ...newFood };
                        newvalue.price = parseInt(e.target.value);
                        setNewFood(newvalue);
                      }}
                      value={price}
                      placeholder="Type food name"
                      className=" w-[288px] pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
                    ></input>
                  </div>
                  <div className="w-full flex flex-row justify-between items-center">
                    <p>Image</p>

                    <div className="flex  flex-col relative w-[288px] h-[90px] p-3 bg-[#ecedf1] justify-center items-center rounded-sm">
                      <img
                        className={` w-[100%] h-[100%] ${
                          image ? "z-10 " : "z-0"
                        } `}
                        src={image}
                      />
                      {image && (
                        <button
                          onClick={() => {
                            image = "";
                          }}
                          className="text-black absolute w-4 h-4 flex justify-center items-center bg-white rounded-full z-100 left-[90%] bottom-[65%]"
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

                      <input
                        type="file"
                        id="insert-img"
                        className="w-[288px] h-[90px] p-3 bg-[#f1f2f6] border-0 opacity-0 absolute"
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-end">
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
