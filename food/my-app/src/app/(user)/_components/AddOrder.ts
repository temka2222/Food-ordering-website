import { useSelecFood } from "./SelectedFoodProvider";
import { useUser } from "@/app/(auth)/sign-up/_components/userValueProvider";
import { api } from "@/app/axios";
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
  const { user } = useUser();
  const AddNewOrder = async () => {
    setIsLoading(true);
    const foodOrderItems = selectedFood.map((item) => ({
      food: item.foodId,
      quantity: item.qty,
    }));

    try {
      await api.post("/order", {
        user: user?._id,
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
