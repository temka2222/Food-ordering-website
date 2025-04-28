import { useNewFood } from "@/app/_components/foodsProvider";
import axios from "axios";
type DeleteFoodType = {
  getFoods: () => Promise<void>;
};
export const DeleteFood = ({ getFoods }: DeleteFoodType) => {
  const { newFood } = useNewFood();

  const deleteFood = async () => {
    try {
      const response = await axios.delete("http://localhost:3001/food", {
        data: { _id: newFood.foodId },
      });

      await getFoods();
    } catch (error) {
      console.error("amjiltgui", error);
    }
  };
};
