import axios from "axios";
import { useEffect, useState } from "react";
import { FoodsType } from "../page";
import {
  UserType,
  UserValueType,
} from "@/app/(auth)/sign-up/_components/userValueProvider";
import { MapIcon, SoupIcon, TimerIcon } from "lucide-react";
import { OrderCartMessage } from "./OrderCartMessage";
import { Skeleton } from "@/components/ui/skeleton";
type FoodType = {
  food: FoodsType;
  quantity: number;
  _id: string;
};
type OrderType = {
  _id: string;
  user: UserValueType;
  totalPrice: number;
  foodOrderItems: FoodType[];
  status: string;
  createdAt: string;
};
const user = "6808c58c4d870d2ccc3fb2ae";
export const OrderHistory = () => {
  const [order, setOrder] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getOrders = async () => {
    const response = await axios.get(
      `http://localhost:3001/order?user=${user}`
    );
    setOrder(response.data.orders);
  };
  useEffect(() => {
    getOrders();
  }, []);
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
              <p>{food.user.address}</p>
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
