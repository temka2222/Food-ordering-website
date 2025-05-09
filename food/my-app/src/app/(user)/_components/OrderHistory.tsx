import axios from "axios";
import { useEffect, useState } from "react";
import { FoodsType } from "../page";
import {
  UserType,
  useUser,
} from "@/app/(auth)/sign-up/_components/userValueProvider";
import { MapIcon, SoupIcon, TimerIcon } from "lucide-react";
import { OrderCartMessage } from "./OrderCartMessage";
import { Skeleton } from "@/components/ui/skeleton";
export type FoodType = {
  food: FoodsType;
  quantity: number;
  _id: string;
};
type OrderType = {
  _id: string;
  user: UserType;
  totalPrice: number;
  foodOrderItems: FoodType[];
  status: string;
  createdAt: string;
};
export const OrderHistory = () => {
  const [order, setOrder] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const getOrders = async () => {
    const response = await axios.get(
      `http://localhost:3001/order?user=${user?._id}`
    );
    setOrder(response.data.orders);
  };
  useEffect(() => {
    getOrders();
  }, []);
  console.log(user);
  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-2xl pb-32">
      <p className="font-medium p-4">Order history</p>

      {order.length > 0 ? (
        order.map((food) => (
          <div
            key={food._id}
            className="flex w-full flex-col text-[#71717A] text-sm gap-1 p-4"
          >
            <div className="w-full flex flex-row justify-between font-medium text-black text-md">
              <p>{food.totalPrice}</p>
              <p>{food.status}</p>
            </div>

            <div className="flex flex-col gap-1 ">
              {food.foodOrderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex w-full flex-row justify-between"
                >
                  <div className="flex flex-row items-center gap-2">
                    <SoupIcon size={18} />
                    <p>{item.food.foodName}</p>
                  </div>
                  <p>x{item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-row items-center gap-2">
              <TimerIcon size={18} />
              <p>{new Date(food.createdAt).toLocaleString()}</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <MapIcon size={18} />
              <p>{user?.address}</p>
            </div>
          </div>
        ))
      ) : (
        // <Skeleton className="flex-1 h-10 w-10" />
        <OrderCartMessage
          title="No Orders Yet?"
          description="🍕 You haven't placed any orders yet. Start exploring our menu and satisfy your cravings!"
        />
      )}
    </div>
  );
};
