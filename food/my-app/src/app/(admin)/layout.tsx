"use client";
import { PropsWithChildren, useState } from "react";
import { Menu } from "./admin/_components/adminMenu";
import { ShieldUser } from "lucide-react";
import { SelectedMenuProvider } from "../_components/selectedMenuProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <SelectedMenuProvider>
       <div className="flex  flex-row h-screen max-w-[1440px] bg-[#E4E4E7] overflow-hidden">
        <Menu />
        <div className="flex-1 flex flex-col overflow-x-auto"> 
          <div className=" flex justify-end pr-18 pl-10 pt-6 pb-6  ">
            <ShieldUser />
          </div>
          <div className="flex-1 overflow-y-auto   m-auto">
            {children}
          </div>  
        </div>
      </div>
    </SelectedMenuProvider>
  );
}
