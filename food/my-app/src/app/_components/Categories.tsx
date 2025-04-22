"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import { useEffect, useState } from "react";
type Category={
  categoryName:string
}
export const Categories = () => {
   const [category,setCategory]=useState<Category[]>([])
     const getFoods = async () => {
    const response = await axios.get("http://localhost:3001/category");
    setCategory(response.data.categories
);
    console.log(" vresponse", response);
  };

  useEffect(() => {
    getFoods();
  }, []);
  return (
    <div className="flex  flex-col gap-10 pt-4 pb-4 ">
      <p className="text-[#FFFFFF] font-bold text-xl">Categories</p>

      <div className="pl-11 pr-11">
        <Carousel>
          <CarouselContent className="flex flex-row gap-4">
            {category?.map((item, indx) => (
              <CarouselItem key={indx} className="basis-auto">
                <button className="px-5 py-2 rounded-full bg-white text-black text-sm whitespace-nowrap">
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
