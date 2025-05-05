import { useEffect, useState } from "react";
import { CategoryType, FoodsType } from "../page";
import axios from "axios";
import { FoodCard } from "./productCard";
export const AllDishesList=()=>{
  
      const [foods, setFoods] = useState<FoodsType[]>([]);
  const [category, setCategory] = useState<CategoryType[]>([]);
  const getFoods = async () => {
    try {
      const responseFood = await axios.get("http://localhost:3001/food");
      setFoods(responseFood.data.foods);
    } catch (error) {
      console.error("Failed to fetch foods:", error);
    }
  };
  const getCategory = async () => {
    try {
      const responseCategory = await axios.get(
        "http://localhost:3001/category"
      );
      setCategory(responseCategory.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    getFoods();
    getCategory();
  }, []);
    return(
        <div className="flex flex-col gap-[54px] pt-22 pr-22 pl-22">
              {category.map((element) => {
                const filteredFoods = foods.filter(
                  (cat) => cat.category.categoryName === element.categoryName
                );
        
                if (filteredFoods.length === 0) return null;
        
                return (
                 
                  <div
                    key={element._id}
                    className="w-full bg-[#404040] p-8 rounded-3xl shadow-lg shadow-stone-950 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="mb-6  border-gray-300 pb-3 flex gap-2">
                      <h2 className="text-xl font-bold text-white">
                        {element.categoryName}
                      </h2>
                    </div>
        
                    <div className="grid grid-cols-4 gap-8">
                      {filteredFoods.map((item) => (
                        <div
                          key={item._id}
                          className=" rounded-xl shadow-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                        >
                          <FoodCard
                            foodId={item._id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

    )
}