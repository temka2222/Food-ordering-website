import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCardContent } from "@/components/ui/hover-card";
import { useEffect, useState } from "react";
import { CardFoodProduct } from "./CardFoodProduct";
import { SelectedFoodType } from "./SelectedFoodProvider";

export const OrderDetail = () => {
  const [cartFoods,setCartFoods]=useState<SelectedFoodType[]>([])
  useEffect(() => {
    
    const storedFood = localStorage.getItem("selectedFood");
    if (storedFood) {
     
        setCartFoods(JSON.parse(storedFood));
        
      }
  
   
  }, []);
  return( <HoverCardContent className="w-[460px] flex flex-col gap-4 p-4  bg-[#404040]">
    <div className=" w-full flex flex-row">
      <Badge className="flex-1 h-9 bg-white text-black rounded-2xl">Cart</Badge>
       <Badge className="flex-1 h-9 bg-white text-black rounded-2xl active:bg-red-500 " variant="destructive" >Order</Badge>
   </div>
   
   <div className="w-full flex flex-col justify-center items-center gap-6 bg-white rounded-2xl">
    <div className="flx-2 flex flex-col ">
    <p className="font-medium p-4">My cart </p>
    {cartFoods.map((food)=>{
      return(<CardFoodProduct foodId={food.foodId} quantity={food.qty}/>)
    })}
</div>
<div className="w-full p-4">
 <Button className="w-full bg-white border border-solid border-red-400 text-red-400 rounded-2xl">Add food</Button>
 </div>

   </div>
  <div className="flex flex-col w-full h-30 bg-black ">

</div>
  </HoverCardContent>);
};
