"use client";
import axios from "axios";
import { useEffect, useState } from "react";
type CountFoodsProps = {
  categoryId: string | "";
};
export const Countfoods = ({ categoryId }: CountFoodsProps) => {
  const [totalFoods, setTotalFoods] = useState<number>(0);
  // const [categoryId, setCategoryId] = useState<string>("");
  const getCountFoods = async () => {
    const response = await axios.get(
      `http://localhost:3001/food/count?categoryId=${categoryId}`
    );
    // setTotalFoods(response.data[0].totalFood);
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
