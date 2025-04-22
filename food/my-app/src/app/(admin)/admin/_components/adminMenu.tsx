import { Logo } from "@/app/_components/assets/Logo";
import {
  LayoutDashboard,
  MenuIcon,
  SettingsIcon,
  TruckIcon,
} from "lucide-react";

export const Menu = () => {
  return (
    <div className="flex flex-col gap-8 pr-5 pl-5 pt-9 pb-9">
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
        <div className="flex flex-row gap-2">
          <LayoutDashboard />
          <p>Food menu</p>
        </div>
        <div className="flex flex-row gap-2">
          <TruckIcon />
          <p>Orders</p>
        </div>
        <div className="flex flex-row gap-2">
          <SettingsIcon />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};
