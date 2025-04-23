"use client";
import { PropsWithChildren, useState } from "react";
import { Menu } from "./admin/_components/adminMenu";
import { ShieldUser } from "lucide-react";
import { SelectedMenuProvider } from "../_components/selectedMenuProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <SelectedMenuProvider>
      <div className="flex flex-row">
        <Menu />
        <div>
          <div className="flex justify-end pr-10 pl-10 pt-6 pb-6  bg-[#E4E4E7]">
            <ShieldUser />
          </div>
          <div className="  max-w-[1440px] m-auto ">{children}</div>
        </div>
      </div>
    </SelectedMenuProvider>
  );
}
