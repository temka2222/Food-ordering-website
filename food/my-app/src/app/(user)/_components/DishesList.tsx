  import axios from "axios";
  import { useState, useEffect } from "react";
  import { CategoryType, FoodsType } from "../page";
  import { FoodCard } from "./productCard";
  import { AllDishesList } from "./AllDishesList";
  import { CategoriesFoodList } from "./CategoriesFoodList";
import { SelectedFoodProvider, useSelecFood } from "./SelectedFoodProvider";
  export type AllDishesType={
  categoryId:string
  }
   
  export const DishesList = ({categoryId}:AllDishesType) => {
   const {selectedFood,setSelectedFood} =useSelecFood()
   const [check,setCheck]=useState(false)
  useEffect(() => {
    const storedFood = localStorage.getItem("selectedFood");
    if (storedFood) {
      setSelectedFood(JSON.parse(storedFood));
    }
    setCheck(true); 
  }, []);

  useEffect(() => {
    if (!check) return; 
    localStorage.setItem("selectedFood", JSON.stringify(selectedFood));
  }, [selectedFood, check]);
    return (
      <div>
       
      {categoryId==""&&<AllDishesList />};
      {categoryId!==""&&<CategoriesFoodList categoryId={categoryId} />}
     
      </div>
    
    );
  };
