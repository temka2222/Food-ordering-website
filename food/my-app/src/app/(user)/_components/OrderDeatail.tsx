import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCardContent } from "@/components/ui/hover-card";
import { useEffect, useState } from "react";
import { CardFoodProduct } from "./CardFoodProduct";
import { SelectedFoodType, useSelecFood } from "./SelectedFoodProvider";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Loader, ShoppingCart } from "lucide-react";
import { formatWithApostrophe } from "./productCard";
import { useAddOrder } from "./AddOrder";
import axios from "axios";
import { UserDialog } from "./Dialog";
import { OrderCartMessage } from "./OrderCartMessage";
import { OrderHistory } from "./OrderHistory";
type OrderDetailType = {
  isOpensheet: boolean;
  setIsOpensheet: (value: boolean) => void;
};
export const OrderDetail = () => {
  const { selectedFood, setSelectedFood } = useSelecFood();
  const [selectedButton, setSelectedButton] = useState("cart");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { AddNewOrder } = useAddOrder({
    setIsLoading,
    setIsOpen,
    setDescription,
    setSelectedButton,
  });
  const shipping = 5000;
  const totalPrice = selectedFood.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <SheetContent className=" w-[500px] flex flex-col gap-6 p-2  bg-[#404040] max-h-screen overflow-y-scroll">
      <SheetHeader>
        <SheetTitle className="flex flex-row gap-4 items-center text-white">
          <ShoppingCart /> Order Detail
        </SheetTitle>
      </SheetHeader>
      <div className=" w-full flex flex-row p-1 bg-white rounded-xl">
        <Button
          variant="destructive"
          onClick={() => {
            setSelectedButton("cart");
          }}
          className={`flex-1 h-9 bg-white text-black rounded-2xl ${
            selectedButton == "cart" ? "bg-red-500 text-white" : ""
          }`}
        >
          Cart
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            setSelectedButton("order");
          }}
          className={`flex-1 h-9 bg-white text-black rounded-2xl ${
            selectedButton == "order" ? "bg-red-500 text-white" : ""
          }`}
        >
          Order
        </Button>
      </div>
      {selectedButton == "cart" && (
        <>
          <div className="w-full flex flex-col justify-center items-center gap-6 bg-white rounded-2xl pb-4 ">
            <div className="flex flex-col">
              <p className="font-medium p-4">My cart</p>
              {selectedFood && selectedFood.length > 0 ? (
                selectedFood.map((food, index) => (
                  <CardFoodProduct
                    key={food.foodId}
                    foodId={food.foodId}
                    index={index}
                  />
                ))
              ) : (
                <OrderCartMessage
                  title="Your cart is empty"
                  description="Hungry? 🍔 Add some delicious dishes to your cart and satisfy your cravings!"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col w-full gap-5  bg-white p-4 rounded-xl">
            <p className="font-medium text-xl">Payment info</p>
            <div className="w-full flex justify-between">
              <p className="text-[#71717A]">Items</p>
              <p className="font-medium">
                {totalPrice !== 0
                  ? "₮" + formatWithApostrophe(totalPrice)
                  : "-"}
              </p>
            </div>
            <div className="w-full flex justify-between">
              <p className="text-[#71717A]">shipping</p>
              <p className="font-medium">
                {totalPrice !== 0 ? "₮" + formatWithApostrophe(shipping) : "-"}
              </p>
            </div>
            <div className="border border-dashed"></div>
            <div className="w-full flex justify-between">
              <p className="text-[#71717A]">Total</p>
              <p className="font-medium">
                {totalPrice !== 0
                  ? "₮" + formatWithApostrophe(shipping + totalPrice)
                  : "-"}
              </p>
            </div>

            <Button
              disabled={totalPrice !== 0 ? false : true}
              onClick={() => {
                AddNewOrder();
              }}
              className="w-full bg-red-500  border border-solid border-red-400 text-white rounded-2xl hover:bg-red-600 "
            >
              {isLoading ? <Loader className="animate-spin" /> : "Checkout"}
            </Button>
          </div>
        </>
      )}
      {selectedButton == "order" && <OrderHistory />}
      <UserDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
      />
    </SheetContent>
  );
};
