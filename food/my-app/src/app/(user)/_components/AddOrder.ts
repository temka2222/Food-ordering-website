import axios from "axios";
import { useSelecFood } from "./SelectedFoodProvider";
type UseAddOrderType = {
  setIsLoading: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  setDescription: (value: string) => void;
  setIsOpensheet: (value: boolean) => void;
};
export const useAddOrder = ({
  setIsLoading,
  setIsOpen,
  setDescription,
  setIsOpensheet,
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
        totalPrice: 0,
      });

      setSelectedFood([]);

      await setDescription("Таны захиалга амжилттай хийгдлээ!");
      await setIsOpen(true);
    } catch (error) {
      console.error("Order failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { AddNewOrder };
};
