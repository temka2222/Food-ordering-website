"use client";
import { Logo } from "./assets/Logo";
import { useRouter } from "next/navigation";
import { useUser } from "../(auth)/sign-up/_components/userValueProvider";
import { ShopCard } from "./assets/Shoppingcard";
import { ChevronRight, MapIcon, MapPin, User2Icon } from "lucide-react";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { OrderDetail } from "../(user)/_components/OrderDeatail";


export const Header = () => {
  const { userValues, setUserValues } = useUser();
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
      {userValues.isLoggedIn === false && (
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
      {userValues.isLoggedIn === true && (
        <div className="flex flex-row gap-3 text-[14px] items-center">
          <div className="flex flex-row gap-1 bg-white pl-3 pr-3 pt-2 pb-2 rounded-full">
            <MapPin className="text-red-300" />
            <p className="text-red-300">Delivery address:</p>
            <p className="text-[#71717A]">Add Location</p>
            <ChevronRight />
          </div>
          <div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="link"
                  className="bg-white pl-3 pr-3 pt-3   pb-3 rounded-full"
                >
                  <ShopCard />
                </Button>
              </HoverCardTrigger>
              <OrderDetail />
            </HoverCard>
          
          </div>
          <div className="group">
            <button className="bg-red-500 pl-2 pr-2 pt-2 pb-2 rounded-full">
              <User2Icon />
              <div className="absolute flex flex-col right-5 top-[80%] mt-2 p-4 gap-8 bg-white border border-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                <p>{userValues.email}</p>
                <button
                  onClick={() => {
                    const newValues = { ...userValues };
                    newValues.isLoggedIn = false;
                    setUserValues(newValues);
                    router.push("/");
                  }}
                  className="p-1 bg-gray-100 rounded-full  "
                >
                  sign out
                </button>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
