"use client";
import { Logo } from "./assets/Logo";
import { useRouter } from "next/navigation";
import { useUser } from "../(auth)/sign-up/_components/userValueProvider";
import { ShopCard } from "./assets/Shoppingcard";
import { ChevronRight, MapIcon, MapPin, User2Icon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderDetail } from "../(user)/_components/OrderDeatail";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddAddress } from "./assets/AddAddress";
export const Header = () => {
  const { user, signOut } = useUser();

  const router = useRouter();
  return (
    <div className="relative   flex flex-row justify-between items-center pr-22 pl-22 pt-3 pb-3 bg-black border-solid border-white border-1">
      <div className=" flex flex-row gap-3">
        <Logo />
        <div>
          <p className="font-bold text-xl text-white">
            Nom<span className="text-red-500">Nom</span>
          </p>
          <p className="text-xs text-white">Swift delivery</p>
        </div>
      </div>
      {!user && (
        <div className="flex flex-row gap-3 text-[14px]">
          <div>
            <button
              onClick={() => {
                router.push("/sign-up");
              }}
              className="bg-white pl-3 pr-3 pt-2 pb-2 rounded-full"
            >
              Sign up
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                router.push("/log-in");
              }}
              className="bg-red-500 pl-3 pr-3 pt-2 pb-2 rounded-full"
            >
              Log in
            </button>
          </div>
        </div>
      )}
      {user && (
        <div className="flex flex-row gap-3 text-[14px] items-center">
          <div className="flex flex-row gap-1 bg-white pl-3 pr-3 pt-2 pb-2 rounded-full">
            <MapPin className="text-red-300" />
            {!user.address ? (
              <div className="flex flex-row gap-1">
                <p className="text-red-300">Delivery address:</p>
                <p className="text-[#71717A]">Add Location</p>
              </div>
            ) : (
              <p>{user.address}</p>
            )}
            <Dialog>
              <DialogTrigger>
                {!user.address ? <ChevronRight /> : <X size={18} />}
              </DialogTrigger>
              <AddAddress />
            </Dialog>
          </div>

          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="link"
                  className="bg-white pl-3 pr-3 pt-3   pb-3 rounded-full"
                >
                  <ShopCard />
                </Button>
              </SheetTrigger>
              <OrderDetail />
            </Sheet>
          </div>
          <div className="group relative">
            <button className="bg-red-500 pl-2 pr-2 pt-2 pb-2 rounded-full">
              <User2Icon />
            </button>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col p-4 gap-2 bg-white border border-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
              <p>{user.email}</p>
              <div className="p-1 bg-gray-100 rounded-full">
                <button onClick={() => signOut()} className="w-full">
                  sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
