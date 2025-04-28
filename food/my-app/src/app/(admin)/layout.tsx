"use client";
import { PropsWithChildren, useState } from "react";
import { Menu } from "./admin/_components/adminMenu";
import { ShieldUser } from "lucide-react";
import { SelectedMenuProvider } from "../_components/selectedMenuProvider";
import { ShowAlertProvider } from "../_components/showAlertProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <SelectedMenuProvider>
      <div className="w-full flex h-screen max-w-[1440px] bg-[#E4E4E7] ">
        <Menu />
        <div className="flex-1 flex flex-col ">
          <div className=" flex justify-end pr-18 pl-10 pt-6 pb-6  ">
            <ShieldUser />
          </div>
          <div className="flex-1 overflow-y-auto ">{children}</div>
        </div>
      </div>
    </SelectedMenuProvider>
  );
}
