"use client";
import { Logo } from "@/app/_components/assets/Logo";
import { useSelectedMenu } from "@/app/(admin)/admin/_components/selectedMenuProvider";
import { LayoutDashboard, SettingsIcon, TruckIcon } from "lucide-react";

export const Menu = () => {
  const { selectedMenu, setSelectedMenu } = useSelectedMenu();
  return (
    <div className="  flex flex-col gap-8 pr-5 pl-5 pt-9 pb-9 bg-white">
      <div className=" flex flex-row gap-3">
        <Logo />
        <div>
          <p className="font-bold text-xl text-black">
            Nom<span className="text-black">Nom</span>
          </p>
          <p className="text-xs text-[#71717A]">Swift delivery</p>
        </div>
      </div>
      <div className=" flex flex-col gap-6">
        <div
          onClick={() => {
            setSelectedMenu("food-menu");
          }}
          className={`flex flex-row gap-2 pl-6 pr-6 pt-2 pb-2 text-nowrap rounded-2xl ${
            selectedMenu === "food-menu" ? "bg-black text-white" : ""
          }`}
        >
          <LayoutDashboard size={18} />
          <p>Food menu</p>
        </div>
        <div
          onClick={() => {
            setSelectedMenu("orders");
          }}
          className={`flex flex-row gap-2 pl-6 pr-6 pt-2 pb-2 text-nowrap rounded-2xl ${
            selectedMenu === "orders" ? "bg-black text-white" : ""
          }`}
        >
          <TruckIcon size={18} />
          <p>Orders</p>
        </div>
        <div
          onClick={() => {
            setSelectedMenu("settings");
          }}
          className={`flex flex-row gap-2 pl-6 pr-6 pt-2 pb-2 text-nowrap rounded-2xl ${
            selectedMenu === "settings" ? "bg-black text-white" : ""
          }`}
        >
          <SettingsIcon size={18} />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};
