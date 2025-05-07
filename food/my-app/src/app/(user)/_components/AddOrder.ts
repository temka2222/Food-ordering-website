import axios from "axios";
import { useSelecFood } from "./SelectedFoodProvider";
type UseAddOrderType = {
  setIsLoading: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  setDescription: (value: string) => void;
  setSelectedButton: (value: string) => void;
};
export const useAddOrder = ({
  setIsLoading,
  setIsOpen,
  setDescription,
  setSelectedButton,
}: UseAddOrderType) => {
  const { selectedFood, setSelectedFood } = useSelecFood();

  const AddNewOrder = async () => {
    setIsLoading(true);
    const foodOrderItems = selectedFood.map((item) => ({
      food: item.foodId,
      quantity: item.qty,
    }));

    try {
      const response = await axios.post("http://localhost:3001/order", {
        user: "6808c58c4d870d2ccc3fb2ae",
        foodOrderItems: foodOrderItems,
      });

      setSelectedFood([]);

      await setDescription("Таны захиалга амжилттай хийгдлээ!");
      await setIsOpen(true);
      setSelectedButton("order");
    } catch (error) {
      console.error("Order failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { AddNewOrder };
};
