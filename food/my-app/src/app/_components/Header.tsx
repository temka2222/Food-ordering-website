"use client";
import { Logo } from "./assets/Logo";

export const Header = () => {
  return (
    <div className="  flex flex-row justify-between items-center pr-22 pl-22 pt-3 pb-3 bg-black border-solid border-white border-1">
      <div className=" flex flex-row gap-3">
        <Logo />
        <div>
          <p className="font-bold text-xl text-white">
            Nom<span className="text-red-500">Nom</span>
          </p>
          <p className="text-xs text-white">Swift delivery</p>
        </div>
      </div>
      <div className="flex flex-row gap-3 text-[14px]">
        <div>
          <button className="bg-white pl-3 pr-3 pt-2 pb-2 rounded-full">
            Sign up
          </button>
        </div>
        <div>
          <button className="bg-red-500 pl-3 pr-3 pt-2 pb-2 rounded-full">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};
