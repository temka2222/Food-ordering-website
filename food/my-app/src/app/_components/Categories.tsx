"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { api } from "../axios";

type Category = {
  categoryName: string;
  _id: string;
};
type CategoriesPrposType = {
  categoryId: string;
  setCategoryId: (value: string) => void;
};
export const Categories = ({
  categoryId,
  setCategoryId,
}: CategoriesPrposType) => {
  const [category, setCategory] = useState<Category[]>([]);

  const getCategory = async () => {
    const response = await api.get("/category");
    setCategory(response.data.categories);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="flex flex-col gap-10 pt-4 pb-4 pr-22 pl-22   ">
      <p className="text-[#FFFFFF] font-bold text-xl">Categories</p>

      <div className="pl-11 pr-11 ">
        <Carousel>
          <CarouselContent className="flex flex-row gap-4 ">
            <button
              onClick={() => {
                setCategoryId("");
              }}
              className={`px-5 py-2 rounded-full text-black text-sm whitespace-nowrap  ${
                categoryId === "" ? "bg-red-400 text-white" : "bg-white"
              }`}
            >
              All dishes
            </button>
            {category?.map((item, indx) => (
              <CarouselItem
                onClick={() => {
                  setCategoryId(item._id);
                }}
                key={indx}
                className="basis-auto "
              >
                <button
                  className={`px-5 py-2 rounded-full text-black text-sm whitespace-nowrap  ${
                    categoryId === item._id
                      ? "bg-red-400 text-white"
                      : "bg-white"
                  }`}
                >
                  {item.categoryName}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-transparent border-0 text-white" />
          <CarouselNext className="bg-transparent border-0 text-white" />
        </Carousel>
      </div>
    </div>
  );
};
