"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { formatWithApostrophe } from "./productCard";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useSelecFood } from "./SelectedFoodProvider";
import { UserDialog } from "./Dialog";
import { useUser } from "@/app/(auth)/sign-up/_components/userValueProvider";
import { useRouter } from "next/navigation";

type SelectFoodPropsType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  foodId: string;
};

export const SelectFood = ({
  foodName,
  price,
  image,
  ingredients,
  foodId,
}: SelectFoodPropsType) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const { selectedFood, setSelectedFood } = useSelecFood();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [MainDialog, setMainDialog] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const AddToCart = (selectedFoodId: string, selectedQty: number) => {
    try {
      const duplicateFood = selectedFood?.filter((item) => {
        return item.foodId == selectedFoodId;
      });
      if (duplicateFood.length > 0) {
        const newCardFood = selectedFood.map((food) => {
          return food.foodId == selectedFoodId
            ? { ...food, qty: food.qty + selectedQty }
            : food;
        });
        setSelectedFood(newCardFood);
      } else {
        setSelectedFood((prev) => [
          ...prev,
          { foodId: selectedFoodId, qty: selectedQty, price: price },
        ]);
      }
      setMainDialog(false);
      setDescription("Сагсанд хоол амжилттай нэмэгдлээ");
      setIsOpen(true);
    } catch (error) {
      console.error("AddToCart error:", error);
    }
  };

  return (
    <div className="absolute left-[75%] top-[45%]">
      <Dialog open={MainDialog} onOpenChange={setMainDialog}>
        <DialogTrigger className="text-red-500 w-9 h-9 flex justify-center items-center bg-white rounded-full ">
          <PlusIcon size={18} />
        </DialogTrigger>
        <DialogContent className="flex flex-row h-[412px] bg-white p-6 rounded-xl">
          <div className="flex-1">
            <img
              className="w-full h-full rounded-xl object-cover"
              src={image}
            />
          </div>
          <div className="flex-1 h-full flex flex-col items-end">
            <div className="flex h-full w-full flex-col justify-between items-start">
              <div className="flex flex-col gap-3">
                <DialogTitle className="text-red-400 font-bold text-2xl">
                  {foodName}
                </DialogTitle>

                <DialogDescription className="text-[16px]">
                  {ingredients}
                </DialogDescription>
              </div>
              <div className="flex w-full flex-col gap-6">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p>Total price</p>
                    <p className="font-bold">
                      ₮{formatWithApostrophe(price * selectedQty)}
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 ">
                    <button
                      className="pl-4 pr-4 pt-2 pb-2 bg-white border-solid border rounded-full"
                      onClick={() => {
                        if (selectedQty == 1) return;
                        if (selectedQty > 1) setSelectedQty(selectedQty - 1);
                      }}
                    >
                      -
                    </button>
                    <p>{selectedQty}</p>
                    <button
                      className="pl-4 pr-4 pt-2 pb-2 bg-white border-solid border rounded-full"
                      onClick={() => {
                        setSelectedQty(selectedQty + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!user) {
                      router.push("./log-in");
                      return;
                    }
                    if (!user.address) {
                      setIsOpen(true);
                      setTitle("Та хүргэлт хүлээн авах хаягаа оруулна уу");
                      setDescription("");
                      setMainDialog(false);
                      return;
                    }

                    AddToCart(foodId, selectedQty);
                  }}
                  className="bg-black text-white pr-8 pl-8 pt-2 pb-2 rounded-2xl"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <UserDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setTitle("");
          setDescription("");
        }}
        title={title}
        description={description}
      />
    </div>
  );
};
