"use client"
import { Categories } from "./_components/Categories";
import { FoodCard } from "./_components/productCard";
import { UserProvider, useUser } from "./sign-up/_components/userValueProvider";



export default function Home() {
   const { userValues, setUserValues } = useUser();
   console.log(userValues)
  return (
    <div className="  flex flex-col bg-[#404040]">
      <div className="h-142">
        <img className="object-fit" src="/BG.png"></img>
      </div>
      <Categories />
      <div>
        <FoodCard CategoryName="1-р хоол"/>
      </div>

    </div>
  );
}
