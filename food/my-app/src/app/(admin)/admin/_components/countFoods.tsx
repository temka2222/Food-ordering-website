"use client";
import { api } from "@/app/axios";
import { useEffect, useState } from "react";
type CountFoodsProps = {
  categoryId: string | "";
};
export const Countfoods = ({ categoryId }: CountFoodsProps) => {
  const [totalFoods, setTotalFoods] = useState<number>(0);
  const getCountFoods = async () => {
    const response = await api.get(`/food/count?categoryId=${categoryId}`);
    setTotalFoods(response.data.totalFood);
  };

  useEffect(() => {
    getCountFoods();
  }, []);

  return (
    <div className=" w-[39px] h-[20px] flex justify-center rounded-xl bg-black text-white items-center">
      {totalFoods}
    </div>
  );
};
